import moment from "moment";
import _ from "lodash";

const currentMonthStatistics = (data) => {
  const currentMonth = moment().format("MM");
  const monthlyData = _.filter(data, (order) => {
    return moment(order.order_date).format("MM") == currentMonth;
  });

  let total_amount = 0;
  let total_quantity = 0;

  if (monthlyData.length > 0) {
    _.forEach(monthlyData, (order) => {
      total_amount += order.amount;
      total_quantity += order.quantity;
    });

    return {
      amount: total_amount,
      quantity: total_quantity,
    };
  } else {
    return {
      amount: 0,
      quantity: 0,
    };
  }
};

const pastMonthStatistics = (data) => {
  const pastMonth = moment().format("MM") - 1;
  const monthlyData = _.filter(data, (order) => {
    return moment(order.order_date).format("MM") == pastMonth;
  });

  let total_amount = 0;
  let total_quantity = 0;
  if (monthlyData.length > 0) {
    _.forEach(monthlyData, (order) => {
      total_amount += order.amount;
      total_quantity += order.quantity;
    });

    return {
      amount: total_amount,
      quantity: total_quantity,
    };
  } else {
    return {
      amount: 0,
      quantity: 0,
    };
  }
};

const dailyStatistics = (data) => {
  const dailyData = _.filter(data, (order) => {
    let today = moment().format("MM/DD/YYYY");
    return moment(today, "MM/DD/YYYY").isSame(moment(order.order_date));
  });
  if (dailyData.length > 0) {
    return {
      amount: dailyData[0].amount,
      quantity: dailyData[0].quantity,
    };
  } else {
    return {
      amount: 0,
      quantity: 0,
    };
  }
};

export const monthlyData = (data) => {
  const currentMonth = currentMonthStatistics(data);
  const pastMonth = pastMonthStatistics(data);

  return [
    {
      title: "MTD Orders",
      value: currentMonth.quantity,
    },
    {
      title: "Last Month Orders",
      value: pastMonth.quantity,
    },
    {
      title: "MTD Order Amount",
      value: currentMonth.amount,
    },
    {
      title: "Last Month Amount",
      value: pastMonth.amount,
    },
  ];
};

export const orderDataDaily = (data) => {
  const daily = dailyStatistics(data);
  const weekly = weeklyStatistics(data);

  return [
    {
      title: "Today's Orders",
      value: daily.quantity,
    },
    {
      title: "Current Week's Orders",
      value: weekly.quantity,
    },
    {
      title: "Today's Order Amount",
      value: daily.amount,
    },
    {
      title: "Current Week's Amount",
      value: weekly.amount,
    },
  ];
};

const weeklyStatistics = (data) => {
  let today = moment().format("MM/DD/YYYY");
  today = moment(today, "MM/DD/YYYY");
  const weeklyData = _.filter(data, (order) => {
    return today.diff(moment(order.order_date), "days") < 7;
  });

  let total_amount = 0;
  let total_quantity = 0;

  if (weeklyData.length > 0) {
    _.forEach(weeklyData, (order) => {
      total_amount += order.amount;
      total_quantity += order.quantity;
    });

    return {
      amount: total_amount,
      quantity: total_quantity,
    };
  } else {
    return {
      amount: 0,
      quantity: 0,
    };
  }
};

export const chartData = (data) => {
  let today = moment().format("MM/DD/YYYY");
  today = moment(today, "MM/DD/YYYY");
  const weeklyData = _.filter(data, (order) => {
    return today.diff(moment(order.order_date), "days") < 7;
  });
  let labels = [],
    orderQuantity = [];
  if (weeklyData.length > 0) {
    _.forEach(weeklyData, (order) => {
      labels.push(order.order_date);
      orderQuantity.push(order.quantity);
    });
  }

  return {
    labels,
    orderQuantity,
  };
};
