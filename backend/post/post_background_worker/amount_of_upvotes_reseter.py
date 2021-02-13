from apscheduler.schedulers.background import BackgroundScheduler
from post.views import VoteView


def start():
    scheduler = BackgroundScheduler()
    vote = VoteView()
    scheduler.add_job(
        vote.reset_amount_of_upvotes,
        "cron",
        hour="0",
        id="reset_001",
        replace_existing=True,
    )
    scheduler.start()
