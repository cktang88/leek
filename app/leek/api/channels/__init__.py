from typing import List, Union
import re

from leek.api.db.store import Task, Worker, Application
from .slack import send_slack


def notify(app: Application, env, events: List[Union[Task, Worker]]):
    fo_triggers = app.fo_triggers
    if not len(fo_triggers):
        return
    for trigger in fo_triggers:
        envs = trigger.envs
        # Skip: Trigger not enabled
        if not trigger.enabled:
            continue
        # Skip: Env not matched
        if len(envs) and env not in envs:
            continue

        states = trigger.states
        exclusions = trigger.exclude
        inclusions = trigger.include
        runtime_upper_bound = trigger.runtime_upper_bound
        for event in events:
            note = None
            state = event.state
            # Skip: event is not related to task
            if event.kind != 'task':
                continue
            # Skip: State not matched
            if len(states) and state not in states:
                continue
            # Skip: task excluded
            if len(exclusions) and any(re.match(exclusion, event.name) for exclusion in exclusions):
                continue
            # Skip: task not included
            elif len(inclusions) and any(re.match(inclusion, event.name) for inclusion in inclusions):
                continue
            if state == "SUCCEEDED" and runtime_upper_bound:
                runtime = event.runtime or 0
                # Skip: task runtime did not exceed runtime upper bound
                if runtime <= runtime_upper_bound:
                    continue
                else:
                    note = f"Runtime upper bound exceeded: `{runtime} seconds`"
            # Finally: notify
            if trigger.type == "slack":
                send_slack(app.app_name, event, trigger.slack_wh_url, extra={"note": note})
