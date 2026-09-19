const users = [
  {
    id: "7b55f190-3b6d-4952-9b21-4f80879f9021",
    fullName: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    createdAt: "2026-09-12T08:30:00.000Z"
  },
  {
    id: "8c66f201-4c7e-5063-ac32-5f90980fa132",
    fullName: "Samuel Estrada",
    email: "samuel.estrada@example.com",
    createdAt: "2026-09-13T10:15:00.000Z"
  }
];

const exercises = [
  {
    id: 1,
    name: "Press de Banca Plano con Barra",
    description: "Acostado sobre un banco plano, descender la barra olímpica de forma controlada hasta la línea del esternón y empujar verticalmente extendiendo los brazos.",
    category: "fuerza",
    muscleGroup: "pecho"
  },
  {
    id: 2,
    name: "Sentadilla Trasera con Barra",
    description: "Colocar la barra sobre los trapecios, descender flexionando cadera y rodillas hasta romper el paralelo (90 grados) y volver a la posición inicial.",
    category: "fuerza",
    muscleGroup: "piernas"
  },
  {
    id: 3,
    name: "Dominadas Pronas",
    description: "Colgarse de una barra con agarre prono (palmas hacia el frente) más ancho que los hombros y elevar el cuerpo hasta que la barbilla pase la barra.",
    category: "fuerza",
    muscleGroup: "espalda"
  },
  {
    id: 4,
    name: "Press Militar de Hombro",
    description: "Empujar la barra o mancuernas verticalmente por encima de la cabeza partiendo desde los hombros hasta la extensión completa de los brazos.",
    category: "fuerza",
    muscleGroup: "hombros"
  }
];

const workouts = [
  {
    id: "e2c34d88-7512-4c91-9e8a-7e618e47b310",
    userId: "7b55f190-3b6d-4952-9b21-4f80879f9021",
    title: "Rutina de Fuerza - Empuje y Pecho",
    scheduledDate: "2026-09-15",
    scheduledTime: "06:30",
    status: "pendiente",
    comments: "Mantener retracción escapular estricta en cada serie. Calentamiento de movilidad articular de 10 min.",
    exercises: [
      {
        id: "3c011e40-128a-4db5-94f1-111111111111",
        exerciseId: 1,
        exerciseName: "Press de Banca Plano con Barra",
        muscleGroup: "pecho",
        order: 1,
        sets: 4,
        reps: 8,
        weightKg: 80.0
      },
      {
        id: "3c011e40-128a-4db5-94f1-222222222222",
        exerciseId: 4,
        exerciseName: "Press Militar de Hombro",
        muscleGroup: "hombros",
        order: 2,
        sets: 3,
        reps: 10,
        weightKg: 45.0
      }
    ],
    createdAt: "2026-09-12T09:10:00.000Z",
    updatedAt: "2026-09-12T09:10:00.000Z"
  }
];

module.exports = {
  users,
  exercises,
  workouts
};
