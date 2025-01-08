import type { NextApiRequest, NextApiResponse } from "next";

let servicesData = {
  privatmajas: {
    title: "Privātmājas",
    description: "Privātmāju projektēšana un būvniecība.",
    images: ["/privatmajas1.jpg", "/privatmajas2.jpg"],
  },
  "lauksaimniecibas-ekas": {
    title: "Lauksaimniecības ēkas",
    description: "Projektējam un būvējam lauksaimniecības ēkas.",
    images: ["/lauki1.jpg", "/lauki2.jpg"],
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(servicesData);
  }

  if (req.method === "POST") {
    const { slug, title, description, images } = req.body;
    servicesData[slug] = { title, description, images };
    return res.status(200).json({ message: "Service updated successfully" });
  }

  res.status(405).json({ message: "Method not allowed" });
}
