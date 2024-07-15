import axios from 'axios'
export const Login = async (email, login) => {
	try {
		const result = await axios.post('http://domain/auth/login', {
			email,
			login,
		})

		return result
	} catch (error) {
		console.log(error)
		return error
	}
}
