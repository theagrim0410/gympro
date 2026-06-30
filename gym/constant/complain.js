const complaint = [
  {
    id: 1,
    userId: "101",
    username: "Alex Rivera",
    category: "Technical Issue",
    subject: "Camera Not Working",
    description:
      "The workout camera crashes whenever I start a Push-Up session.",
    status: "Pending",
    createdAt: "2026-06-20T09:30:00Z",
  },
  {
    id: 2,
    userId: "102",
    username: "Sarah Chen",
    category: "Workout Accuracy",
    subject: "Incorrect Rep Count",
    description:
      "The AI counted only 8 squats even though I completed 12.",
    status: "In Review",
    createdAt: "2026-06-20T11:15:00Z",
  },
  {
    id: 3,
    userId: "103",
    username: "Mike Johnson",
    category: "Billing",
    subject: "Subscription Charged Twice",
    description:
      "I was charged twice for my monthly premium membership.",
    status: "Resolved",
    createdAt: "2026-06-19T14:45:00Z",
  },
  {
    id: 4,
    userId: "104",
    username: "Emma Wilson",
    category: "Technical Issue",
    subject: "App Freezing",
    description:
      "The application freezes when opening workout history.",
    status: "Pending",
    createdAt: "2026-06-18T18:20:00Z",
  },
  {
    id: 5,
    userId: "105",
    username: "David Brown",
    category: "Other",
    subject: "Feature Request",
    description:
      "Please add a dark mode toggle and workout reminders.",
    status: "Open",
    createdAt: "2026-06-17T08:10:00Z",
  },
];

export const addComplaint = (
  userId,
  username,
  category,
  subject,
  description
) => {
  const newComplaint = {
    id: complaint.length + 1,
    userId,
    username,
    category,
    subject,
    description,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  complaint.push(newComplaint);

  return newComplaint;
};

export default complaint;

//done