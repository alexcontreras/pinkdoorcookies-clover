const axios = require('axios');
const options = {
	headers: {
		'Authorization': 'Bearer 8a84d42c-35eb-8686-e601-8f643c879931'
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
