export const milestones = [
  {
    id: 1,
    activity: "Foodtruck Fancon",
    amount: 15000000,
    illustration: "/media/foodtruck.svg",
  },
  {
    id: 2,
    activity: "Booth Checkin",
    amount: 35000000,
    illustration: "/media/checkin.svg",
  },
  {
    id: 3,
    activity: "Gift, Photo Booth",
    amount: 45000000,
    illustration: "/media/boothphoto.svg",
  },
  {
    id: 4,
    activity: "LED HCM",
    amount: 60000000,
    illustration: "/media/led.svg",
  },
];

// Get total goal from the last milestone (highest amount)
export const totalGoal = Math.max(...milestones.map((m) => m.amount));

// Get total donation amount by summing all donor contributions
// export const donationAmount = donors.reduce(
//   (sum, donor) => sum + donor.amount,
//   0
// );

export const donationAmount = 58257495;
// Calculate percentage of goal reached
export const percentage = (donationAmount / totalGoal) * 100;
