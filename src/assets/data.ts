import { IArticle, IIndexSlider } from "~/types/admin-api";

export const news: IArticle[] = [
  {
    id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    description:
      "The story of the future of our planet and species is one that is yet to be told for a few, the story is a warning of what is happening and what not to do. As a rule, we don’t know the future, but we do our best to make correct judgments. Most of us are aware of our impact on the future of our planet and us, but for some, we are more affected than effective. Stas x Obvious attempt to display that warning in a creative new way, which is now on exhibit at the Weinberg/Newton Gallery in Chicago, Illinois.",
    images: [
      {
        id: 1,
        created_at: new Date(),
        name: "",
        updated_at: new Date(),
        url: "/images/noroot_ph.png",
      },
    ],
    is_hot: true,
    text: `The BBC published a recent article in Culture, written by Diane Cole, informing the reader about the various interactive and sensory-immersive art currently on display at the Human/Nature exhibit in Chicago. The exhibition lures would-be bystanders to take a closer look and fills them with sensory perceptions that identify manufactured threats to our future and our planet.
    Doomsday is a look into that potential future, presented in the article as an "eerily beautify and devastatingly empty" addition to the collection that brings together Stas' photography with the AI-powered imagination of Obvious.`,
    title: "How dystopias can save the world",
    next: {
      id: 2,
      title: "How dystopias can save the world 2",
    },
  },
  {
    id: 2,
    created_at: new Date(),
    updated_at: new Date(),
    description:
      "The story of the future of our planet and species is one that is yet to be told for a few, the story is a warning of what is happening and what not to do. As a rule, we don’t know the future, but we do our best to make correct judgments. Most of us are aware of our impact on the future of our planet and us, but for some, we are more affected than effective. Stas x Obvious attempt to display that warning in a creative new way, which is now on exhibit at the Weinberg/Newton Gallery in Chicago, Illinois.",
    images: [
      {
        id: 1,
        created_at: new Date(),
        name: "",
        updated_at: new Date(),
        url: "/images/noroot_ph.png",
      },
    ],
    is_hot: false,
    text: `The BBC published a recent article in Culture, written by Diane Cole, informing the reader about the various interactive and sensory-immersive art currently on display at the Human/Nature exhibit in Chicago. The exhibition lures would-be bystanders to take a closer look and fills them with sensory perceptions that identify manufactured threats to our future and our planet.
    Doomsday is a look into that potential future, presented in the article as an "eerily beautify and devastatingly empty" addition to the collection that brings together Stas' photography with the AI-powered imagination of Obvious.`,
    title: "How dystopias can save the world 2",
  },
  {
    id: 3,
    created_at: new Date(),
    updated_at: new Date(),
    description:
      "The story of the future of our planet and species is one that is yet to be told for a few, the story is a warning of what is happening and what not to do. As a rule, we don’t know the future, but we do our best to make correct judgments. Most of us are aware of our impact on the future of our planet and us, but for some, we are more affected than effective. Stas x Obvious attempt to display that warning in a creative new way, which is now on exhibit at the Weinberg/Newton Gallery in Chicago, Illinois.",
    images: [
      {
        id: 1,
        created_at: new Date(),
        name: "",
        updated_at: new Date(),
        url: "/images/noroot_ph.png",
      },
    ],
    is_hot: false,
    text: `The BBC published a recent article in Culture, written by Diane Cole, informing the reader about the various interactive and sensory-immersive art currently on display at the Human/Nature exhibit in Chicago. The exhibition lures would-be bystanders to take a closer look and fills them with sensory perceptions that identify manufactured threats to our future and our planet.
    Doomsday is a look into that potential future, presented in the article as an "eerily beautify and devastatingly empty" addition to the collection that brings together Stas' photography with the AI-powered imagination of Obvious.`,
    title: "How dystopias can save the world 3",
  },
];

export const projects = [
  {
    id: 1,
    title: "Absctract",
    description:
      "Et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
    details: [
      {
        price: 4000,
        sizes: [
          {
            width: 100,
            height: 100,
            unit: "cm",
          },
        ],
        image: {
          id: 4,
          name: "aiosjd",
          url: "/dev/project_ph.jpg",
          custom_name: "ainfeopjfwei",
        },
      },
      {
        price: 3000,
        sizes: [
          {
            width: 100,
            height: 100,
            unit: "cm",
          },
        ],
        image: {
          id: 5,
          name: "ewrwfs",
          url: "/dev/project_ph.jpg",
          custom_name: "ainfeopjfwei",
        },
      },
      {
        price: 3000,
        sizes: [
          {
            width: 100,
            height: 100,
            unit: "cm",
          },
        ],
        image: {
          id: 6,
          name: "ewrwfs",
          url: "/dev/project_ph.jpg",
          custom_name: "ainfeopjfwei",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Landscape",
    description:
      "Et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
    details: [
      {
        price: 4000,
        sizes: [
          {
            width: 100,
            height: 100,
            unit: "cm",
          },
        ],
        image: {
          id: 1,
          name: "aiosjd",
          url: "/dev/project_ph.jpg",
          custom_name: "Image 1",
        },
      },
      {
        price: 3000,
        sizes: [
          {
            width: 100,
            height: 100,
            unit: "cm",
          },
        ],
        image: {
          id: 2,
          name: "ewrwfs",
          url: "/dev/project_ph.jpg",
          custom_name: "Image 2",
        },
      },
      {
        price: 3000,
        sizes: [
          {
            width: 100,
            height: 100,
            unit: "cm",
          },
        ],
        image: {
          id: 3,
          name: "ewrwfs",
          url: "/dev/project_ph.jpg",
          custom_name: "Image 3",
        },
      },
    ],
  },
];

export const blogs = [
  {
    id: 1,
    title:
      "Obvious x Stas Bartnikas: A Collaboration of Aerial Photography and Artificial Intelligence",
    desc: "The technological capabilities of artificial intelligence (AI) offer new touchstones for understanding and acting on climate change. OBVIOUS, a collective of three artist friends in Paris, create art using AI.",
    text: `The technological capabilities of artificial intelligence (AI) offer new touchstones for understanding and acting on climate change. OBVIOUS, a collective of three artist friends in Paris, create art using AI. For the Human/Nature exhibition, they collaborated with aerial nature photographer Stas Bartnikas, who has taken many thousands of aerial photographs of landscapes around the world, including of sensitive ecosystems, to create The DoomsdAI Clock.Obvious x Stas Bartnikas:
    A Collaboration of Aerial Photography and Artificial IntelligenceAdapting the imagery of the Bulletin’s Doomsday Clock to convey "criticism and a message of hope" in addressing climate change, the piece is an evolving, evocative artwork displaying an AI-generated video within a frame of aluminum and wood. The time displayed on the clock coordinates with the official time announced by the Bulletin of Atomic Scientists.
    
    For The DoomsdAI Clock, OBVIOUS created an algorithm primarily using the landscapes of Iceland, along with photos of other remote places on Earth, to project a composite of landscape images in a process of rapid transformation. Just over 5,000 photos were required to produce an algorithm with high-definition results in 24 hours—a significant advance over what was possible a few years ago.
    
    Today, AI research, or machine learning with the universal Python programming language, is used to predict changes to the earth’s ecosystems as a consequence of climate change; and to devise ways to repair ecological damage, for example, to the barrier reefs, and to preserve the habitats of endangered species. Morphing images of landscapes in The DoomsdAI Clock, not representative of a particular place, but deeply evocative of Earth’s magical beauty, suggest unknown possibilities for imminent changes to the earth’s surface; and remind us that AI may reflect back to us something different, something more than human awareness is currently capable of perceiving or imagining.
    As Misho Ceko, Harris COO who oversees art installations at the Keller Center, notes, "AI promises seemingly limitless potential for predicting environmental conditions and testing solutions to the climate crisis in ways that are safe and efficient, accurate and cost effective — they're not invasive or dangerous, nor constrained by time and physical resources. The AI work being done by OBVIOUS exemplifies the power and potential of art to convey complex scientific data to diverse public audiences—communities who urgently need to be educated and engaged in new ways about climate change."`,
    date: "2023-03-11",
    images: [
      {
        id: 1,
        name: "img",
        url: "https://static.tildacdn.com/tild3862-3835-4337-a633-633563333830/20210401_-_Art_0152.jpg",
      },
    ],
    next: {
      id: 2,
      title:
        "Obvious x Stas Bartnikas: A Collaboration of Aerial Photography and Artificial Intelligence 2",
    },
  },
  {
    id: 2,
    title:
      "Obvious x Stas Bartnikas: A Collaboration of Aerial Photography and Artificial Intelligence 2",
    desc: "The technological capabilities of artificial intelligence (AI) offer new touchstones for understanding and acting on climate change. OBVIOUS, a collective of three artist friends in Paris, create art using AI.",
    text: `The technological capabilities of artificial intelligence (AI) offer new touchstones for understanding and acting on climate change. OBVIOUS, a collective of three artist friends in Paris, create art using AI. For the Human/Nature exhibition, they collaborated with aerial nature photographer Stas Bartnikas, who has taken many thousands of aerial photographs of landscapes around the world, including of sensitive ecosystems, to create The DoomsdAI Clock.Obvious x Stas Bartnikas:
    A Collaboration of Aerial Photography and Artificial IntelligenceAdapting the imagery of the Bulletin’s Doomsday Clock to convey "criticism and a message of hope" in addressing climate change, the piece is an evolving, evocative artwork displaying an AI-generated video within a frame of aluminum and wood. The time displayed on the clock coordinates with the official time announced by the Bulletin of Atomic Scientists.
    
    For The DoomsdAI Clock, OBVIOUS created an algorithm primarily using the landscapes of Iceland, along with photos of other remote places on Earth, to project a composite of landscape images in a process of rapid transformation. Just over 5,000 photos were required to produce an algorithm with high-definition results in 24 hours—a significant advance over what was possible a few years ago.
    
    Today, AI research, or machine learning with the universal Python programming language, is used to predict changes to the earth’s ecosystems as a consequence of climate change; and to devise ways to repair ecological damage, for example, to the barrier reefs, and to preserve the habitats of endangered species. Morphing images of landscapes in The DoomsdAI Clock, not representative of a particular place, but deeply evocative of Earth’s magical beauty, suggest unknown possibilities for imminent changes to the earth’s surface; and remind us that AI may reflect back to us something different, something more than human awareness is currently capable of perceiving or imagining.
    As Misho Ceko, Harris COO who oversees art installations at the Keller Center, notes, "AI promises seemingly limitless potential for predicting environmental conditions and testing solutions to the climate crisis in ways that are safe and efficient, accurate and cost effective — they're not invasive or dangerous, nor constrained by time and physical resources. The AI work being done by OBVIOUS exemplifies the power and potential of art to convey complex scientific data to diverse public audiences—communities who urgently need to be educated and engaged in new ways about climate change."`,
    date: "2023-03-11",
    images: [
      {
        id: 1,
        name: "img",
        url: "https://static.tildacdn.com/tild3862-3835-4337-a633-633563333830/20210401_-_Art_0152.jpg",
      },
    ],
    next: {
      id: 3,
      title:
        "Obvious x Stas Bartnikas: A Collaboration of Aerial Photography and Artificial Intelligence 3",
    },
    prev: {
      id: 1,
      title:
        "Obvious x Stas Bartnikas: A Collaboration of Aerial Photography and Artificial Intelligence",
    },
  },
  {
    id: 3,
    title:
      "Obvious x Stas Bartnikas: A Collaboration of Aerial Photography and Artificial Intelligence 3",
    desc: "The technological capabilities of artificial intelligence (AI) offer new touchstones for understanding and acting on climate change. OBVIOUS, a collective of three artist friends in Paris, create art using AI.",
    text: `The technological capabilities of artificial intelligence (AI) offer new touchstones for understanding and acting on climate change. OBVIOUS, a collective of three artist friends in Paris, create art using AI. For the Human/Nature exhibition, they collaborated with aerial nature photographer Stas Bartnikas, who has taken many thousands of aerial photographs of landscapes around the world, including of sensitive ecosystems, to create The DoomsdAI Clock.Obvious x Stas Bartnikas:
    A Collaboration of Aerial Photography and Artificial IntelligenceAdapting the imagery of the Bulletin’s Doomsday Clock to convey "criticism and a message of hope" in addressing climate change, the piece is an evolving, evocative artwork displaying an AI-generated video within a frame of aluminum and wood. The time displayed on the clock coordinates with the official time announced by the Bulletin of Atomic Scientists.
    
    For The DoomsdAI Clock, OBVIOUS created an algorithm primarily using the landscapes of Iceland, along with photos of other remote places on Earth, to project a composite of landscape images in a process of rapid transformation. Just over 5,000 photos were required to produce an algorithm with high-definition results in 24 hours—a significant advance over what was possible a few years ago.
    
    Today, AI research, or machine learning with the universal Python programming language, is used to predict changes to the earth’s ecosystems as a consequence of climate change; and to devise ways to repair ecological damage, for example, to the barrier reefs, and to preserve the habitats of endangered species. Morphing images of landscapes in The DoomsdAI Clock, not representative of a particular place, but deeply evocative of Earth’s magical beauty, suggest unknown possibilities for imminent changes to the earth’s surface; and remind us that AI may reflect back to us something different, something more than human awareness is currently capable of perceiving or imagining.
    As Misho Ceko, Harris COO who oversees art installations at the Keller Center, notes, "AI promises seemingly limitless potential for predicting environmental conditions and testing solutions to the climate crisis in ways that are safe and efficient, accurate and cost effective — they're not invasive or dangerous, nor constrained by time and physical resources. The AI work being done by OBVIOUS exemplifies the power and potential of art to convey complex scientific data to diverse public audiences—communities who urgently need to be educated and engaged in new ways about climate change."`,
    date: "2023-03-11",
    images: [
      {
        id: 1,
        name: "img",
        url: "https://static.tildacdn.com/tild3862-3835-4337-a633-633563333830/20210401_-_Art_0152.jpg",
      },
    ],
    prev: {
      id: 2,
      title:
        "Obvious x Stas Bartnikas: A Collaboration of Aerial Photography and Artificial Intelligence 2",
    },
  },
];

export const slider: IIndexSlider = {
  id: 1,
  active: true,
  created_at: new Date(),
  updated_at: new Date(),
  images: [
    {
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      name: "image 1",
      url: "/images/noroot_ph.png",
    },
    {
      id: 2,
      created_at: new Date(),
      updated_at: new Date(),
      name: "image 2",
      url: "/images/noroot_ph.png",
    },
    {
      id: 3,
      created_at: new Date(),
      updated_at: new Date(),
      name: "image 3",
      url: "/images/noroot_ph.png",
    },
  ],
  name: "ewrwer",
};
