
		const tags = document.querySelector('#tags')
		const search = document.querySelector('#search');
		const imagesBox = document.querySelector('#imagesBox');

		search.addEventListener('click', getInput)
		function getInput(){	
			if(tags.value.length === 0){
				alert("You haven't entered any username")
			}else{
				let names = tags.value.split(',');
				getUsers(names);
			}
		}

		async function getUsers(names) {
		  let users = [];
		  let output;
		  imagesBox.innerHTML = "";

		  names.forEach(name => {
			let endpoint = `https://api.github.com/users/${name}`;
		    let user = fetch(endpoint).then(
		      response => {
		        if (response.statusText != "OK") {
					alert(`${name} ${response.statusText.toLowerCase()}`)
		          	return null;
		        } else {  
						let userdata =  response.json();
						userdata.then(prop => {
								let figure = document.createElement('figure');
								let html = `<img class="images" src="${prop.avatar_url}"  alt="${prop.login}">
								<figCaption><span><b>${prop.name}</b> (${prop.login})</span><a href="${prop.html_url}" target="_blank"><button class="btn btn-success">View Profile</button></a></figcaption>`;
								figure.innerHTML = html;
								imagesBox.insertAdjacentElement("beforeend", figure)
							});
						return userdata;
		        }
		      },
		      reject => {
				alert(`Something went wrong. Check your network connection and try again`)
		        return null;
		      }
		    );
			users.push(user);
			console.log("users", users)
		  })

		  output = await Promise.all(users);
		  console.log(output);
		  return output;
        }
        

        
		// let names = [ "Daltimore", "osayiosas", "shosenwales", "timmy471", "kennietimmie", "orsdev", "sambalicious", "temially", "azukaemeshili", "phiiileo", "onuoha92"]
		// console.log(getUsers(names))