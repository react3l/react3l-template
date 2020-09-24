import React from "react";
import { storiesOf } from "@storybook/react";
import nameof from "ts-nameof.macro";
import ChatBox from "./ChatBox";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { Observable, of } from "rxjs";
import moment from "moment";
import { FileModel, Message } from "./ChatBox.model";

const listMessageDemo = [
    {   id: 1, 
        discussionId: '9b1a5cc1-ed96-4c4f-b44f-dc8491a5b136',  
        content: '<a>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</a>', 
        creatorId: 10, 
        createdAt: moment(), 
        creator: {
            id: 10, 
            userName: 'Le Duc Thang', 
            displayName: 'thangld19', 
            avatar: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
        },
    },
    {   id: 2, 
        discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
        content: '<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="IMG"/>', 
        creatorId: 11, 
        createdAt: moment(), 
        creator: {
            id: 11, 
            userName: 'Le Duc Thang',
            displayName: 'thangld19', 
            avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
        },
    },
    {   id: 3, 
        discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
        content: '<a>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</a>', 
        creatorId: 11, 
        createdAt: moment(), 
        creator: {
            id: 11, 
            userName: 'Le Duc Thang',
            displayName: 'thangld19', 
            avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
        },
    },
    {   id: 4, 
        discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
        content: 'Lorem Ipsum is simply', 
        creatorId: 11, 
        createdAt: moment(), 
        creator: {
            id: 11, 
            userName: 'Le Duc Thang',
            displayName: 'thangld19', 
            avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
        },
    },
    {   id: 5, 
        discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 
        creatorId: 10, 
        createdAt: moment(), 
        creator: {
            id: 10, 
            userName: 'Le Duc Thang',
            displayName: 'thangld19', 
            avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
        },
    },
    {   id: 6, 
        discussionId: '930cd7ca-b3b0-4105-8c82-6e45d2f64ef7', 
        content: 'Lorem Ipsum is simply dummy text', 
        creatorId: 10, 
        createdAt: moment(), 
        creator: {
            id: 10, 
            userName: 'Le Duc Thang',
            displayName: 'thangld19', 
            avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
        },
    },
];

const demoObservable = new Observable<Model[]>((observer) => {
    setTimeout(() => {
      observer.next(listMessageDemo);
      observer.complete();
    }, 1000);
});

const countObservable = new Observable<number>((observer) => {
    setTimeout(() => {
      observer.next(50);
      observer.complete();
    }, 1000);
});

const demoSearchFunc = (TModelFilter: ModelFilter) => {
    return demoObservable;
};

const demoCountFunc = (TModelFilter: ModelFilter) => {
    return countObservable;
};

const demoPostFunc = (Message: Message) => {
    return of(Message);
};

const demoAttachFunc = (file: File) => {
    const fileValue: FileModel = {
        id: 1,
        name: file.name,
        path: '/testpath',
    };
    return of(fileValue);
};

const demoDeleteFunc = (message: any) => {
    return of(true);
};

function Default() {
    return <div style={{width: '350px', height: '450px', margin: 'auto'}}>
        <ChatBox getMessages={demoSearchFunc}
            countMessages={demoCountFunc}
            postMessage={demoPostFunc}
            deleteMessage={demoDeleteFunc}
            attachFile = {demoAttachFunc}
            discussionId={'cb042dd9-03bf-4218-a126-9cd7444c68e4'}
            userInfo={{
                id: 10, 
                userName: 'Le Duc Thang',
                displayName: 'thangld19', 
                avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
                }}/>
    </div>;
};

storiesOf("ChatBox", module).add(nameof(Default), Default);