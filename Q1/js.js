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

async function getStockcorrel() {
    const ticker1 = document.getElementById("ticker1").value;
    const ticker2 = document.getElementById("ticker2").value;
    const minutes = document.getElementById("corr_minutes").value;

    const url1 = `http://20.244.56.144/evaluation-service/stocks/${ticker1}?minutes=${minutes}`;
    const url2 = `http://20.244.56.144/evaluation-service/stocks/${ticker2}?minutes=${minutes}`;

    const res1 = await fetch(url1, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const res2 = await fetch(url2, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data1 = await res1.json();
    const data2 = await res2.json();

    const prices1 = data1.map(p => p.price);
    const prices2 = data2.map(p => p.price);

    const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const n = Math.min(prices1.length, prices2.length);
    const x = prices1.slice(0, n);
    const y = prices2.slice(0, n);
    const avgX = avg(x);
    const avgY = avg(y);

    let numerator = 0, denomX = 0, denomY = 0;
    for (let i = 0; i < n; i++) {
        const dx = x[i] - avgX;
        const dy = y[i] - avgY;
        numerator += dx * dy;
        denomX += dx ** 2;
        denomY += dy ** 2;
    }

    const correlation = (Math.sqrt(denomX) * Math.sqrt(denomY)) !== 0
        ? numerator / (Math.sqrt(denomX) * Math.sqrt(denomY))
        : 0;

    document.getElementById("output3").innerText = JSON.stringify({
        correlation,
        [ticker1]: {
        averagePrice: avgX,
        priceHistory: data1
        },
        [ticker2]: {
        averagePrice: avgY,
        priceHistory: data2
        }
    }, null, 2);
}
