app.post('/send-notification', (req, res) => {
    const { token, message } = req.body;
  
    const payload = {
      notification: {
        title: 'Notification Alert',
        body: message,
      },
    };
  
    admin.messaging().sendToDevice(token, payload)
      .then(response => {
        res.status(200).send('Notification sent successfully');
      })
      .catch(error => {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
      });
  });

  app.post('/save-user', async (req, res) => {
    const { name, phoneNumber, profileImage, fcmToken } = req.body;
    const user = new User({ name, phoneNumber, profileImage, fcmToken });
    await user.save();
    res.status(200).send('User saved successfully');
  });