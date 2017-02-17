
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });

  response.write(object);

  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responses = {
    message: 'This is a successful response',
    id: 'succes',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responses.message}</message>`;
    responseXML = `${responseXML} <age>${responses.id}</age>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }
  const responseString = JSON.stringify(responses);

  return respond(request, response, 200, responseString, 'application/json');
};


const badRequest = (request, response, params, acceptedTypes) => {
  const responses = {
    message: 'This request has the required parameters.',
    id: '',
  };

  if (!params.valid || params.valid !== 'true') {
    responses.message = 'Missing valid query parameter set to true';
    responses.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responses.message}</message>`;
      responseXML = `${responseXML} <id>${responses.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }
    const responseString = JSON.stringify(responses);
    return respond(request, response, 400, responseString, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responses.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseString = JSON.stringify(responses);
  return respond(request, response, 200, responseString, 'application/json');
};


const unauthorized = (request, response, params, acceptedTypes) => {
  const responses = {
    message: 'This request has the required parameters',
    id: '',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responses.message = 'Missing loggedIn query parameter set to yes';
    responses.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responses.message}</message>`;
      responseXML = `${responseXML} <id>${responses.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }
    const responseString = JSON.stringify(responses);
    return respond(request, response, 401, responseString, 'application/json');
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responses.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseString = JSON.stringify(responses);
  return respond(request, response, 200, responseString, 'application/json');
};


// Copy ^ for each
const forbidden = (request, response, acceptedTypes) => {
  const responses = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responses.message}</message>`;
    responseXML = `${responseXML} <id>${responses.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }
  const responseString = JSON.stringify(responses);
  return respond(request, response, 403, responseString, 'application/json');
};


const internal = (request, response, acceptedTypes) => {
  const responses = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responses.message}</message>`;
    responseXML = `${responseXML} <id>${responses.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }
  const responseString = JSON.stringify(responses);
  return respond(request, response, 500, responseString, 'application/json');
};


const notImplemented = (request, response, acceptedTypes) => {
  const responses = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responses.message}</message>`;
    responseXML = `${responseXML} <id>${responses.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }
  const responseString = JSON.stringify(responses);
  return respond(request, response, 501, responseString, 'application/json');
};


const notFound = (request, response, acceptedTypes) => {
  const responses = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responses.message}</message>`;
    responseXML = `${responseXML} <id>${responses.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }
  const responseString = JSON.stringify(responses);
  return respond(request, response, 404, responseString, 'application/json');
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
  getIndex,
};
