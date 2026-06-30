const workouts = [
    {
        id: 1,
        name: "Push-ups",
        description: "A bodyweight exercise that targets the chest, shoulders, and triceps. It helps build upper body strength and endurance. Push-ups can be modified to suit different fitness levels, making them a versatile exercise for all ages. They can be performed anywhere without the need for equipment, making them a convenient choice for a quick workout.",
        image: require("../assets/push-up.jpg") || require("../assets/bg1.jpg"),
        video: require("../assets/push-ups-video.mp4"),
        caloriesBurned: 100,
        sets: 3,
        repetitions: 12,
        restTime: 60,
        steps : [
            "Start in a plank position with your hands shoulder-width apart.",
            "Lower your body until your chest nearly touches the floor.",
            "Push yourself back up to the starting position."
        ],
        mistake: "Keep your body in a straight line from head to heels and avoid sagging your hips or arching your back during the exercise.",
        route : "/workout?id=1"
    },
    {
        id: 2,
        name: "Squats",
        description: "A fundamental lower body exercise that targets the quadriceps, hamstrings, glutes, and core muscles. Squats help improve strength, flexibility, and balance. They can be performed with or without weights, making them suitable for all fitness levels. Proper form is essential to prevent injury and maximize the benefits of this exercise.",
        image: require("../assets/squats.jpg") || require("../assets/bg1.jpg"),
        video: require("../assets/squats-video.mp4"),
        caloriesBurned: 150,
        sets: 3,
        repetitions: 12,
        restTime: 60,
        steps : [
            "Stand with your feet shoulder-width apart.",
            "Lower your body by bending your knees and hips, keeping your back straight.",
            "Go down until your thighs are parallel to the floor, then push through your heels to return to the starting position."
        ],
        mistake: "Ensure your knees do not extend past your toes during the squat to avoid strain on the knee joints.",
        route : "/workout?id=2"
    },
    {
        id: 3,
        name: "Bicep Curls",
        description: "A fundamental upper body exercise that targets the biceps brachii muscle. Bicep curls help improve arm strength, definition, and overall upper body aesthetics. They can be performed with dumbbells, resistance bands, or even household items, making them accessible for all fitness levels. Proper form is essential to prevent injury and maximize the benefits of this exercise.",
        image: require("../assets/bicep-curls.jpg") || require("../assets/bg1.jpg"),
        video: require("../assets/bicep-curls-video.mp4"),
        caloriesBurned: 50,
        sets: 3,
        repetitions: 12,
        restTime: 60,
        steps : [
            "Stand with your feet shoulder-width apart.",
            "Hold the dumbbells with your palms facing forward.",
            "Keep your elbows close to your sides and curl the weights toward your shoulders."
        ],
        mistake: "Avoid swinging your body or using momentum to lift the weights, as this can lead to injury and reduce the effectiveness of the exercise.",
        route : "/workout?id=3"
    },

    {
        id:4 ,
        name: "Lunges",
        description: "A lower body exercise that targets the quadriceps, glutes, and hamstrings. Lunges help improve balance, coordination, and overall lower body strength. They can be performed with body weight or added resistance, making them a versatile exercise for all fitness levels. Proper form is essential to prevent injury and maximize the benefits of this exercise.",
        image: require("../assets/lunges.jpg") || require("../assets/bg1.jpg"),
        video: require("../assets/lunges-video.mp4"),
        caloriesBurned: 150,
        sets: 3,
        repetitions: 12,
        restTime: 60,
        steps : [
            "Stand with your feet shoulder-width apart.",
            "Step forward with one leg, lowering your body until both knees are at 90 degrees.",
            "Push off the front foot to return to the starting position, then repeat with the other leg."
        ],
        mistake: "Ensure you keep your core engaged and avoid arching your lower back during the exercise to prevent strain and maximize effectiveness.",
        route : "/workout?id=4"
    },

    {
        id: 5,
        name: "Shoulder Press",
        description: "A compound exercise that targets the shoulders, triceps, and upper chest. The shoulder press helps improve shoulder stability, strength, and overall upper body power. It can be performed with dumbbells, a barbell, or resistance bands, making it a versatile exercise for all fitness levels. Proper form is essential to prevent injury and maximize the benefits of this exercise.",
        image: require("../assets/shoulder-press.jpg") || require("../assets/bg1.jpg"),
        video: require("../assets/shoulder-press-video.mp4"),
        caloriesBurned: 200,
        sets: 3,
        repetitions: 12,
        restTime: 60,
        steps : [
            "Stand with your feet shoulder-width apart and hold the dumbbells at shoulder height with your palms facing forward.",
            "Press the dumbbells overhead until your arms are fully extended.",
            "Lower the dumbbells back to shoulder height and repeat."
        ],
        mistake: "Ensure you maintain proper form throughout the exercise, especially during the push-up and jump phases, to avoid injury and maximize effectiveness.",
        route : "/workout?id=5"
    },
    
]

export default workouts;




//done