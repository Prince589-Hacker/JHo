const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/stream.m3u8', async (req, res) => {
  const url = 'http://live12p-ssai-akt-mum-child.cdn.hotstar.com/hls/live/2024729/inallow-ipl-2025/hin/1540040384/15mindvrm01ccfe4ffb23914e88903d8f896cb1c42619may2025/master_ap_1080_6.m3u8?random=3-inallow-ipl-2025&content_id=1540040384&language=hindi&resolution=1920x1080&hash=18bc&bandwidth=1940400&media_codec=codec=h265:dr=sdr&audio_codec=aac&layer=child&playback_proto=http&playback_host=live12p-pristine-akt.cdn.hotstar.com&si_match_id=713680';

  const headers = {
  "Hs-Id": "SSAI::A_U:D_NA:G_U:S_UP:M_NCR:N_NA:C1_3:C3_1:P_P_AN",
  "User-Agent": "Hotstar;in.startv.hotstar/25.03.21.6.11354 (Android/15)",
  "X-Country-Code": "in",
  "X-HS-Platform": "android",
  "X-HS-Request-Id": "9d2e6b11-845e-4a2d-b956-c24f5d062579",
  "X-HS-Device-Id": "531bfdd1-8527-4cfa-81d1-7a6c141f812d",
  "Accept-Language": "eng",
  "X-HS-Accept-Language": "eng",
  "app_name": "android",
  "X-HS-Client": "platform:android;app_id:in.startv.hotstar;app_version:25.03.21.6;os:Android;os_version:15;schema_version:0.0.1458;brand:OnePlus;model:CPH2487;carrier:JIO%204G;network_data:NETWORK_TYPE_WIFI",
  "X-HS-Schema-Version": "0.0.1458",
  "X-HS-Client-Targeting": "ad_id:531bfdd1-8527-4cfa-81d1-7a6c141f812d;user_lat:false;hw_id:955b20b7416bbdfb",
  "X-HS-APP-ID": "166bc939-9b11-4b69-b8e6-89a1c8c75dfd",
  "X-HS-App": "11354",
  "Accept-Encoding": "gzip",
  "Host": "live12p-ssai-akt-mum-child.cdn.hotstar.com",
  "Connection": "Keep-Alive",
  "Cookie": "CloudFront-Key-Pair-Id=APKAJC3ILMJXG4AINKJA; CloudFront-Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovLypsaXZlLXNzYWktY2YtbXVtLWFjZS5jZG4uaG90c3Rhci5jb20vaGxzL2xpdmUvMjAyNDcyOS9pbmFsbG93LWlwbC0yMDI1L2hpbi8xNTQwMDQwMzg0LzE1bWluZHZybTAxY2NmZTRmZmIyMzkxNGU4ODkwM2Q4Zjg5NmNiMWM0MjYxOW1heTIwMjUvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0Nzc1MzUzN319fV19; CloudFront-Signature=Abj33XXlYJ3V5cgc7RiiuUdU2ZxIWn-K4kXmN1EplFxa1uIRzxr-bj9stGNtIYLHhmzAx~dseLCqaFIUsIL9Kl-TFv4kpaBxMYr5t2-cWX4D4j9O2cY3fGlJGbTRqJZXiwIMeFVlvuIh8GsbL8OE6PK-tC-49O5XyA~kYjhzhBRibQ3-Cos1PQIP4l1p5aPjGgeZj0YpmkC1YLO1uN2XQvTnENVNmLh4iG6Dvws3Z2gIomtMrEjCa8~GZEWtWnRYcpjZ92RJe-T3CtZZkhmuPy-BOGFBVImhV1t8cPivN0ztXcE57K4gzukbej-szuDNPFFCuFF01jr9De0p1msLRg__; hdntl=exp=1747668937~raf=1747667737~acl=/hls/live/2024729/inallow-ipl-2025/hin/1540040384/15mindvrm01ccfe4ffb23914e88903d8f896cb1c42619may2025/master_ap~ttl=1800~type=paid~data=ip=fTZUBkL3dzkmYfbDIGXE3h-userid=6iLPg4cKWEKC7AR0MLxB0o5uBa2ToKtdmNICnq3oQPJp-did=CsvFJxIvpfVz3paI9o6MszY7e1KGQS5AITbXuIxF5UnNNfOQstcbfDL-cc=in-de=1-pl=android-ap=25.03.21.6-ut=free-fpassv2-rd=565-cd=35-ad=600-ce=1747667137-~hmac=166e02daca9cd71a25ee8c5b2da89fcdb5e910ca8f43c2c7962af489f82150bd"
}


try {

    const response = await axios.get(url, { headers });

    const m3u8Content = response.data;

const modifiedContent = m3u8Content.replace(
  /^(.+\.(ts|m4s|mp4))$/gm,
  (match) => `/segment?id=${encodeURIComponent(match)}`
);

    res.set('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(modifiedContent);
  } catch (error) {
    console.error('Error fetching stream:', error.message);
    res.status(500).send('Error fetching stream');
  }
});

app.get('/segment', async (req, res) => {

  const segmentPath = req.query.id; 

  const fullSegmentUrl = `http://absiakjacqteaaayaaaaaaaaaaaaa.live-ssai-cf-mum-ace.cdn.hotstar.com${segmentPath}`;

console.log(fullSegmentUrl);

const headers = {
  "Hs-Id": "SSAI::A_U:D_NA:G_U:S_UP:M_NCR:N_NA:C1_3:C3_1:P_P_AN",
  "Accept-Encoding": "identity",
  "User-Agent": "Hotstar;in.startv.hotstar/25.03.21.6.11354 (Android/15)",
  "X-Country-Code": "in",
  "X-HS-Platform": "android",
  "X-HS-Request-Id": "55f63576-37f0-4000-8e7a-54bea7435f93",
  "X-HS-Device-Id": "531bfdd1-8527-4cfa-81d1-7a6c141f812d",
  "Accept-Language": "eng",
  "X-HS-Accept-Language": "eng",
  "app_name": "android",
  "X-HS-Client": "platform:android;app_id:in.startv.hotstar;app_version:25.03.21.6;os:Android;os_version:15;schema_version:0.0.1458;brand:OnePlus;model:CPH2487;carrier:JIO%204G;network_data:NETWORK_TYPE_WIFI",
  "X-HS-Schema-Version": "0.0.1458",
  "X-HS-Client-Targeting": "ad_id:531bfdd1-8527-4cfa-81d1-7a6c141f812d;user_lat:false;hw_id:955b20b7416bbdfb",
  "X-HS-APP-ID": "166bc939-9b11-4b69-b8e6-89a1c8c75dfd",
  "X-HS-App": "11354",
  "Host": "absiakjacqteaaayaaaaaaaaaaaaa.live-ssai-cf-mum-ace.cdn.hotstar.com",
  "Connection": "Keep-Alive",
  "Cookie": "CloudFront-Key-Pair-Id=APKAJC3ILMJXG4AINKJA; CloudFront-Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovLypsaXZlLXNzYWktY2YtbXVtLWFjZS5jZG4uaG90c3Rhci5jb20vaGxzL2xpdmUvMjAyNDcyOS9pbmFsbG93LWlwbC0yMDI1L2hpbi8xNTQwMDQwMzg0LzE1bWluZHZybTAxY2NmZTRmZmIyMzkxNGU4ODkwM2Q4Zjg5NmNiMWM0MjYxOW1heTIwMjUvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0Nzc1MzUzN319fV19; CloudFront-Signature=Abj33XXlYJ3V5cgc7RiiuUdU2ZxIWn-K4kXmN1EplFxa1uIRzxr-bj9stGNtIYLHhmzAx~dseLCqaFIUsIL9Kl-TFv4kpaBxMYr5t2-cWX4D4j9O2cY3fGlJGbTRqJZXiwIMeFVlvuIh8GsbL8OE6PK-tC-49O5XyA~kYjhzhBRibQ3-Cos1PQIP4l1p5aPjGgeZj0YpmkC1YLO1uN2XQvTnENVNmLh4iG6Dvws3Z2gIomtMrEjCa8~GZEWtWnRYcpjZ92RJe-T3CtZZkhmuPy-BOGFBVImhV1t8cPivN0ztXcE57K4gzukbej-szuDNPFFCuFF01jr9De0p1msLRg__; hdntl=exp=1747668937~raf=1747667737~acl=/hls/live/2024729/inallow-ipl-2025/hin/1540040384/15mindvrm01ccfe4ffb23914e88903d8f896cb1c42619may2025/master_ap~ttl=1800~type=paid~data=ip=fTZUBkL3dzkmYfbDIGXE3h-userid=6iLPg4cKWEKC7AR0MLxB0o5uBa2ToKtdmNICnq3oQPJp-did=CsvFJxIvpfVz3paI9o6MszY7e1KGQS5AITbXuIxF5UnNNfOQstcbfDL-cc=in-de=1-pl=android-ap=25.03.21.6-ut=free-fpassv2-rd=565-cd=35-ad=600-ce=1747667137-~hmac=166e02daca9cd71a25ee8c5b2da89fcdb5e910ca8f43c2c7962af489f82150bd"
};


  try {
    const segmentResponse = await axios.get(fullSegmentUrl, {
      headers,
      responseType : 'stream',
    });

    res.set(segmentResponse.headers);
    segmentResponse.data.pipe(res);
  } catch (err) {
    console.error('Error fetching segment:', err.message);
    res.status(500).send('Failed to fetch segment');
  }
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>HLS Stream Player</title>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      <style>
        body { margin: 0; background-color: #000; display: flex; justify-content: center; align-items: center; height: 100vh; }
        video { width: 100%; width: 100%; border: 2px solid #fff; }
      </style>
    </head>
    <body>
      <video id="video" controls autoplay></video>
      <script>
        const video = document.getElementById('video');
        const streamUrl = '/stream.m3u8';

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = streamUrl;
          video.addEventListener('loadedmetadata', function () {
            video.play();
          });
        } else {
          alert("HLS not supported in this browser.");
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});