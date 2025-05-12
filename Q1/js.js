const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDYwMTMwLCJpYXQiOjE3NDcwNTk4MzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJjZDYyMGMwLWQyZjctNGI1OS1iMjgzLTZiOGQyNGUwM2Y2MiIsInN1YiI6Im5laGFsbWljcm8yOUBnbWFpbC5jb20ifSwiZW1haWwiOiJuZWhhbG1pY3JvMjlAZ21haWwuY29tIiwibmFtZSI6Im5laGFsIGtoYW4iLCJyb2xsTm8iOiJjaC5lbi51NGNzZTIyMDQxIiwiYWNjZXNzQ29kZSI6IlN3dXVLRSIsImNsaWVudElEIjoiMmNkNjIwYzAtZDJmNy00YjU5LWIyODMtNmI4ZDI0ZTAzZjYyIiwiY2xpZW50U2VjcmV0IjoiWXlHeGNneWplZ01kU0pNdCJ9.9kZsvTndQFg_G8QaO2R32gT0w5_mnSDQP3KKWJ56Gkk";

async function getStocklist() {
    const url = `http://20.244.56.144/evaluation-service/stocks`;

    const res = await fetch(url, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
    });

    const data = await res.json();
    document.getElementById("output1").innerText = JSON.stringify(data, null, 2);
}

async function getStockavg() {
      const ticker = document.getElementById("ticker").value;
      const minutes = document.getElementById("minutes").value;
      const url = `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`;

      const res = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      document.getElementById("output2").innerText = JSON.stringify(data, null, 2);
    }
