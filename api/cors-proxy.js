const axios = require('axios');
const options = {
	headers: {
		'Authorization': `Bearer ${process.env.CLOVER_AUTH_TOKEN}`
	}
}

const handler = async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to proxy request' });
  }
};

module.exports = handler;
