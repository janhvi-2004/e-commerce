"use client";

import { UserProvider, useUserContext } from "@/app/context/user.context";
import Card from "@/app/components/Card/Card";
import { useParams } from "next/navigation";

function Wishlist() {
  const { wishlist, loading } = useUserContext();

  if (loading) return <p>Loading wishlist...</p>;
  return (
    <div>
      {wishlist && wishlist.length > 0 ? (
        wishlist.map((item) => (
          <Card
            _id={item._id}
            key={item._id}
            productName={item.productName}
            category={item.category}
            productImage={item.productImage}
            price={item.price}
            quantity={item.quantity}
          />
        ))
      ) : (
        <p>No items in wishlist</p>
      )}
    </div>
  );
}

export default function WishlistPageWrapper() {
  const params = useParams();
  const userId = params.userId as string;
  return (
    <UserProvider userId={userId}>
      <Wishlist />
    </UserProvider>
  );
}
