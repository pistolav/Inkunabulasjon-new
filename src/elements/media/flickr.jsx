import {createFlickr} from "flickr-sdk";
const yourApiKey = 'affbc4b8099f913c59c5956cfdb1f570';
const {flickr} = createFlickr(yourApiKey);

const data = {
    method: 'flickr.photos.search',
    api_key: yourApiKey,
    text: 'cat', // Search Text
    sort: 'interestingness-desc',
    per_page: 12,
    license: '4',
    extras: 'owner_name,license',
    format: 'json',
    nojsoncallback: 1,
};

const parameters = new URLSearchParams(data);

const url = `https://api.flickr.com/services/rest/?${parameters}`;
console.log(url);

const getFlickr = async () => {
    const response = await flickr("flickr.photos.search", {
        text: "cat",
        sort: "interestingness-desc",
        per_page: 12,
        license: "4",
        extras: "owner_name,license",
    });
    console.log("flickr", response);
    return response;
}

export default getFlickr;
