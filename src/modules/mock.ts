export interface Locations {
  locationId: number;
  locationName: string;
  description: string;
  shortDescription: string;
  imagePath: string;
  videoPath: string;
  playersCount: string;
  isDeleted?: boolean; // 🔹 Добавлено для моков (не используется)
}

export const LOCATIONS_MOCK: Locations[] = [
  {
    locationId: 1,
    locationName: "Тирсфальские леса",
    description: "Заброшенные леса Лордерона с богатыми залежами золота и лесными угодьями.",
    shortDescription: "Ancient forest with gold deposits",
    imagePath: "http://localhost:9000/locations/map1.jpg",
    videoPath: "http://localhost:9000/locations/map1.mp4",
    playersCount: "3-6",
    isDeleted: false,
  },
  {
    locationId: 2,
    locationName: "Пустоши Дурхота",
    description: "Сухие красные степи, где золото встречается часто, а дерево можно найти только в редких оазисах.",
    shortDescription: "Red steppes and oases",
    imagePath: "http://localhost:9000/locations/map2.jpg",
    videoPath: "http://localhost:9000/locations/map2.mp4",
    playersCount: "2-4",
    isDeleted: false,
  },
  {
    locationId: 3,
    locationName: "Ледяная Корона",
    description: "Суровая мерзлота с незначительными запасами древесины, но богатыми золотыми жилами глубоко во льдах.",
    shortDescription: "Icy lands with golden veins",
    imagePath: "http://localhost:9000/locations/map3.jpg",
    videoPath: "http://localhost:9000/locations/map3.mp4",
    playersCount: "4-8",
    isDeleted: false,
  },
  {
    locationId: 4,
    locationName: "Болота Печали",
    description: "Топкое негостеприимное место, бедное на любые ресурсы — только выживание и контроль над ограниченными источниками.",
    shortDescription: "Dangerous swamps",
    imagePath: "http://localhost:9000/locations/map4.jpg",
    videoPath: "http://localhost:9000/locations/map4.mp4",
    playersCount: "1-3",
    isDeleted: false,
  },
  {
    locationId: 5,
    locationName: "Пылающие степи",
    description: "Выжженная демоническая земля, где нет деревьев, но золото течет рекой (в прямом смысле — жидкое золото в лаве).",
    shortDescription: "Demonic lava fields",
    imagePath: "http://localhost:9000/locations/map5.jpg",
    videoPath: "http://localhost:9000/locations/map5.mp4",
    playersCount: "2-4",
    isDeleted: false,
  },
];