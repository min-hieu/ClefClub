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

// function to get all collabs
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


// function to get all clapped collabs of user with ID
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

// function to get collab with ID
export const getCollab = async (id) => {
  return (await db.collection("sessions").doc(id).get()).data();
};

// function to get user with ID
export const getUser = async (id) => {
  return (await db.collection("users").doc(id).get()).data();
};

// function to get request with ID
export const getRequest = async (id) => {
  return (await db.collection("requests").doc(id).get()).data();
};


// function to get all outgoing requests of user with ID
export const getOutgoingRequests = async (id) => {
  // debugger
  var requests = await db.collection("requests").get();
  var closed = [];
  var pending = [];
  requests.docs.map((doc) => {
    if (doc.data().requesterId == id && doc.data().status == 'pending'){
          pending.push({
            requestId: doc.id,
            collabId: doc.data().collabId,
            requesterId: doc.data().requesterId,
            collabTitle: doc.data().collabTitle,
            requesterName: doc.data().requesterName,
            acceptedN: doc.data().acceptedIds.length,
            declinedN: doc.data().declinedIds.length,
            acceptedIds: doc.data().acceptedIds,
            declinedIds: doc.data().declinedIds,
            message: doc.data().message,
            videoURL: doc.data().videoURL,
          })
      }
      if (doc.data().requesterId == id && doc.data().status != 'pending'){
          closed.push({
            requestId: doc.id,
            collabId: doc.data().collabId,
            requesterId: doc.data().requesterId,
            collabTitle: doc.data().collabTitle,
            requesterName: doc.data().requesterName,
            acceptedN: doc.data().acceptedIds.length,
            declinedN: doc.data().declinedIds.length,
            acceptedIds: doc.data().acceptedIds,
            declinedIds: doc.data().declinedIds,
            message: doc.data().message,
            videoURL: doc.data().videoURL,
          })
      } 
  });
  console.log("Pending out:",pending, "Closed out:", closed)
  return [pending, closed];
};

// function to get all outgoing requests of user with ID
export const getIncomingRequests = async (id) => {
  // debugger
  var requests = await db.collection("requests").get();

  var waiting = [];
  var closed = [];

  requests.docs.map((doc) => {
    // console.log("receiverIds:",doc.data().receiverIds)
    if (doc.data().receiverIds && doc.data().receiverIds.includes(id) && doc.data().status == 'pending'){
      if ( !doc.data().acceptedIds.includes(id) && !doc.data().declinedIds.includes(id)){
        waiting.push({
          requestId: doc.id,
          collabId: doc.data().collabId,
          collabTitle: doc.data().collabTitle,
          requesterId: doc.data().requesterId,
          requesterName: doc.data().requesterName,
          acceptedN: doc.data().acceptedIds.length,
          declinedN: doc.data().declinedIds.length,
          acceptedIds: doc.data().acceptedIds,
          declinedIds: doc.data().declinedIds,
          message: doc.data().message,
          videoURL: doc.data().videoURL,
        })
      }
    }
    if (doc.data().receiverIds && doc.data().receiverIds.includes(id)
      && (doc.data().acceptedIds.includes(id) || doc.data().declinedIds.includes(id))
      ){
        closed.push({
          requestId: doc.id,
          collabId: doc.data().collabId,
          requesterId: doc.data().requesterId,
          collabTitle: doc.data().collabTitle,
          requesterName: doc.data().requesterName,
          acceptedN: doc.data().acceptedIds.length,
          declinedN: doc.data().declinedIds.length,
          acceptedIds: doc.data().acceptedIds,
          declinedIds: doc.data().declinedIds,
          message: doc.data().message,
          videoURL: doc.data().videoURL,
        })
      } 
  });
  // console.log("Incoming: waiting, closed:",waiting,closed)
  return [waiting, closed];
};


