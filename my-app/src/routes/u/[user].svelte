<script context="module">
	import { Privacy } from '/src/Enums/profileEnums.ts';
	import { Authorization, ApiRoot } from '/src/auth';

	export async function load({ session, params }) {
		const sessionUser = session.body.user;
		const username = params.user;

		//get the profile of the parameter user
		const apiResponse = await fetch(`${ApiRoot}/api/profiles?filter[username]=${username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization
			}
		});
		let user = {};
		const requestBody = await apiResponse.json();
		const selectedPrivacyOption = requestBody.data[0].attributes.privacy;
		const privacyOption = Privacy[selectedPrivacyOption];
		user.username = username;
		user.email = requestBody.data[0].attributes.email;

		//Page Owner
		if (sessionUser.username === user.username){
			console.log('Page Owner');
		}

		//TODO: check privacy option and return the profile if it is public or is befriended or is the user
		
		return {
			props: {
				sessionUser
			}
		};
	}
</script>
