module.exports = async (ctx, next) => {

  if (ctx.session) {
    Object.assign(ctx.session, {
      isAppAuthenticated:() => {
        return !!(ctx.session.application);
      },
      isEmployeeAuthenticated:()=>{
        return !!(ctx.session.employee);
      },
      hasOpenSchedule:() => {
        return !!(ctx.session.schedule && ctx.session.schedule._id);
      }
    });

    //if(!ctx.session.isAppAuthenticated() && !ctx.session.isEmployeeAuthenticated()) {
    const userTgId = ctx.message.from.id;
    if(userTgId) {
      const employee = await ctx.app.service('employees').find({
        query: {
          'accounts.telegram': parseInt(userTgId)
        }
      });
      if (employee.total > 0) {
        Object.assign(ctx.session, {
          employee: employee.data[0],
          application: employee.data[0].application
        });
      }
    }
    //}

    if(ctx.session.isAppAuthenticated() && ctx.session.isEmployeeAuthenticated()) {
      if(!ctx.session.hasOpenSchedule()){
        const schedules = await ctx.app.service('schedules').find({
          query: {
            employee: ctx.session.employee._id,
            endDate: null
          }
        });
        if(schedules.total > 0) {
          ctx.session.schedule = schedules.data[0];
        }
      }
    }
  }
  return next();
};
