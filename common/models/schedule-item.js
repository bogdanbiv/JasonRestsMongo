module.exports = function(ScheduleItem) {
  ScheduleItem.beforeRemote('**', function(ctx, schedItem, next) {
    ctx.req.log.info({req: ctx.req, item: schedItem}, "beforeRemote");
    next();
  });

  ScheduleItem.afterRemote('**', function(ctx, schedItem, next) {
    ctx.req.log.info({req: ctx.req, item: schedItem}, "afterRemote");
    next();
  });
};
