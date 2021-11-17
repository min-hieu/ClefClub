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
    
    if (doc.data().userIds){
      if (doc.data().userIds.includes(id)) joined.push(Object.assign({}, doc.data(), {collabId: doc.id}));
    }else{
      return null;
    }
    
  });
  return joined;
};

// function to get all collabs of user with ID
export const getAllCollabs = async () => {
  // debugger
  var collabs = await db.collection("sessions").get();
  var all = [];
  collabs.docs.map((doc) => {
      if (doc.data()) all.push(Object.assign({}, doc.data(), {collabId: doc.id}));
  });
  // console.log("All collabs:", all)
  return all;
};


// function to get all collabs of user with ID
export const getUserClaps = async (id) => {
  // debugger
  var collabs = await db.collection("sessions").get();
  var clapped = [];
  collabs.docs.map((doc) => {
    // console.log(doc.data().userIds.includes(id))
    if (doc.data().clappedIds){
      if (doc.data().clappedIds.includes(id) && !doc.data().userIds.includes(id)) clapped.push(Object.assign({}, doc.data(), {collabId: doc.id}));
    }else{
      return null;
    }
    
  });
  return clapped;
};

// function to get all collabs of user with ID
export const getCollab = async (id) => {
  return (await db.collection("sessions").doc(id).get()).data();
};


