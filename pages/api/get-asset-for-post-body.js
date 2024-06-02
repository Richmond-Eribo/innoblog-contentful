import { getAssetFromPostBody } from "../../lib/api";

export default async function handler(req, res) {
  const id = JSON.parse(req.body).id;

  try {
    const asset = await getAssetFromPostBody(id);

    console.log(asset, "doe");

    res.status(200).json({ asset });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}
