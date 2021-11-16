import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"

const DBContext = React.createContext()


export function createId(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

// function to get all collabs of user with ID
export const getUserCollabs = async (id) => {
  // debugger
  var collabs = await db.collection("sessions").get();
  var joined = [];
  collabs.docs.map((doc) => {
    // console.log(doc.data().userIds.includes(id))
    if (doc.data().userIds) {
      if (doc.data().userIds.includes(id)) joined.push(doc.data());
    }
  });
  return joined;
};


