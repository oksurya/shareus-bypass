let requestCounter = 0;

function updateRequestCounter() {
    // Display the number of processed requests
    document.getElementById("requestCounter").innerText = `Number of Requests Processed: ${requestCounter}`;
}
async function sendReport(sid) {
            requestCounter++;

  requestCounter++;
        updateRequestCounter();
    const reportEndpoint = `https://api.shrslink.xyz/report?sid=${sid}`;
    const reportPayload = {
        filled: 10,
        total: 10
    };

    try {
        const reportResponse = await fetch(reportEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
                'Accept': 'application/json, text/plain, */*',
                'Sec-Ch-Ua-Mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.199 Safari/537.36',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Origin': 'https://shareus.io',
                'Sec-Fetch-Site': 'cross-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            },
            body: JSON.stringify(reportPayload),
        });

        if (reportResponse.ok) {
        await displayShortcode();
            console.log('Report sent successfully');
        } else {
            console.error('Error sending report:', reportResponse.statusText);
        }
    } catch (error) {
        console.error('Error sending report:', error.message);
    }
}

async function displayDestination() {
    try {
        const sid = document.getElementById("sidInput").value;
        const response = await fetch(`https://api.shrslink.xyz/get_link?sid=${sid}`);
        const data = await response.json();
        const iframeSource = `https://shareus.io/${data.shortid}`;
await sendReport(sid);


        // Display link_info in a table format
        const iframe = document.createElement("iframe");
        iframe.src = iframeSource;
        iframe.style.width = "100%";
        iframe.style.height = "400px"; // Set the desired height

        const urloutput = document.createElement("span");
        document.getElementById("urloutput").innerHTML = "";
        document.getElementById("urloutput").appendChild(urloutput);

        // Display the destination URL as a button
        const destinationButton = document.createElement("a");
        destinationButton.href = data.link_info.destination;
        destinationButton.classList.add("btn");
        destinationButton.target = "_blank";
        destinationButton.innerHTML = "Open link";

        document.getElementById("destinationResult").innerHTML = "";
        document.getElementById("destinationResult").appendChild(destinationButton);

        // Send report asynchronously
        await sendReport(sid);
    } catch (error) {
        console.error("Error fetching link information from the API:", error.message);
    }
}

async function displayShortcode() {
    try {
        const urlInputValue = "qgCIE8";
        const response = await fetch(`https://api.shrslink.xyz/v?shortid=${extractShortcode(urlInputValue)}&initial=true&referrer=`);
        const data = await response.json();

        // Display the shortcode (sid) from the API response
        document.getElementById("sidInput").value = data.sid;

        // Trigger displayDestination function
        await displayDestination();
    } catch (error) {
        console.error("Error fetching data from the API:", error.message);
    }
}

function extractShortcode(url) {
    // Assuming the shortcode is the last part of the URL after the last '/'
    const parts = url.split("/");
    return parts[parts.length - 1];
}
window.addEventListener('load', function() {
    displayShortcode();
});
