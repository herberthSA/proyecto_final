
class chatControllers {
     chat = (req, res) => {
        return res.render('chat-socket', {});
      }
}

export const chatController = new chatControllers();