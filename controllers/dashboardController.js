import catchAsyncError from "../middlewares/catchAsyncError.js";
import { Stats } from "../model/stats.js";

export const getStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];
  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }

  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscriptions: 0,
      views: 0,
    });
  }

  const userCount = statsData[11].users;
  const subscriberCount = statsData[11].subscriptions;
  const viewsCount = statsData[11].views;

  let userProfit = true,
    subscriptionProfit = true,
    viewsProfit = true;
  let userPercentage = 0,
    subscriptionPercentage = 0,
    viewsPercentage = 0;

  if (statsData[10].users === 0) userPercentage = userCount * 100;
  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  if (statsData[10].subscriptions === 0)
    subscriptionPercentage = subscriberCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscriptions: statsData[11].subscriptions - statsData[10].subscriptions,
    };

    userPercentage = (difference.users / statsData[10].users) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    subscriptionPercentage =
      (difference.subscriptions / statsData[10].subscriptions) * 100;

    if (userPercentage < 0) userProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    userCount,
    subscriberCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    userPercentage,
    viewsProfit,
    userProfit,
    subscriptionProfit,
  });
});
