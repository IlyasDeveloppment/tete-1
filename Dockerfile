FROM node:21

WORKDIR /app

ARG VERDACCIO_REGISTRY=${VERDACCIO_REGISTRY}
ARG VERDACCIO_TOKEN=${VERDACCIO_TOKEN}

COPY package*.json ./

RUN echo '#!/bin/sh' > setup.sh && \
    echo 'node -e "\
    const fs = require(\"fs\"); \
    const package = JSON.parse(fs.readFileSync(\"package.json\", \"utf8\")); \
    const devLinkopusDeps = {}; \
    for (const [key, value] of Object.entries(package.dependencies || {})) { \
        if (key.startsWith(\"dev.linkopus\")) { \
        devLinkopusDeps[key] = value; \
        delete package.dependencies[key]; \
        } \
    } \
    fs.writeFileSync(\"package.json\", JSON.stringify(package, null, 2)); \
    fs.writeFileSync(\"dev-linkopus-deps.json\", JSON.stringify(devLinkopusDeps, null, 2)); \
    "' >> setup.sh && \
    echo 'npm install' >> setup.sh && \
    echo 'node -e "\
    const fs = require(\"fs\"); \
    const package = JSON.parse(fs.readFileSync(\"package.json\", \"utf8\")); \
    const devLinkopusDeps = JSON.parse(fs.readFileSync(\"dev-linkopus-deps.json\", \"utf8\")); \
    package.dependencies = { ...package.dependencies, ...devLinkopusDeps }; \
    fs.writeFileSync(\"package.json\", JSON.stringify(package, null, 2)); \
    "' >> setup.sh && \
    echo 'echo "registry=http://$VERDACCIO_REGISTRY/" > .npmrc' >> setup.sh && \
    echo 'echo "//$VERDACCIO_REGISTRY/:_authToken=\"$VERDACCIO_TOKEN\"" >> .npmrc' >> setup.sh && \
    echo 'npm install' >> setup.sh && \
    chmod +x setup.sh

RUN ./setup.sh

COPY . .

RUN npm run build

EXPOSE $PORT

CMD ["node", "build/src/index.js"]