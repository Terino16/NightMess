/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ItemProps = {
  id: string;
  name: string;
  photo: string;
  price: number;
  sellerId: string;
};

const ItemCard: React.FC<ItemProps> = ({
  id,
  name,
  photo,
  price,
  sellerId,
}) => {
  return (
    <Card className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-purple-100">
      <img
        className="w-full h-48 object-contain"
        src={photo}
        alt="Item Photo"
      />
      <CardHeader>
        <CardTitle className="text-black">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-black text-base">Price: Rs{price}</p>
        <p className="text-black text-base">Seller ID: {sellerId}</p>
      </CardContent>
      <div className=" w-full ">
        <Dialog>
          <DialogTrigger className="w-full">
            {" "}
            <button className=" w-full px-4 py-2 bg-blue-400 border font-bold text-white grow">
              Buy
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Currently under development</DialogTitle>
              <DialogDescription>
               Happy to Serve
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default ItemCard;
