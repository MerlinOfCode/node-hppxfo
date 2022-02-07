const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
   

exports.sendNotificationToFCMToken = functions.firestore.document('booker-comments/{mUid}').onWrite(async (event) => {
    const uid = event.after.get('user_id');
    const name = event.after.get('name');
    const storyId = event.after.get('story_id');
    const comment = event.after.get('comment');
    let authorPath = await admin.firestore().doc(`User-stories-booker/${storyId}/`).get();
    

    let authorId = userDoc.get('user-id');
    let userDoc = await admin.firestore().doc(`booker-tokens/${authorId}`).get();
    
    let fcmToken = userDoc.get('token');

    var message = {
        notification: {
            title: name + "commented on your story!",
            body: comment,
        },
        token: fcmToken,
    }

    let response = await admin.messaging().send(message);
    console.log(response);
});