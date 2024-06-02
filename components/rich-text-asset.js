import Image from "next/image";
import { getAssetFromPostBody } from "../lib/api";
import { useEffect, useState } from "react";

// export async function getServerSideProps() {
//   const asset = await getAssetFromPostBody(id);

//   return { props: { asset } };
// }

export default function RichTextAsset({ id }) {
  const [asset, setAsset] = useState(null);

  useEffect(async () => {
    const assets = await fetch("/api/get-asset-for-post-body", {
      method: "POST",
      body: JSON.stringify({ id }),
    }).then(res => res.json());

    setAsset(assets.asset);
  }, []);

  if (asset) {
    return (
      <>
        {/* {console.log(asset, "foe")} */}
        <Image
          src={asset?.data.asset.url}
          height={asset?.data.asset.height}
          width={asset?.data.asset.width}
          alt={asset?.data.asset.title}
        />
      </>
    );
  }
  return null;
}
