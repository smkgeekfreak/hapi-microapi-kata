# Pull base image.
FROM dockerfile/nodejs

# Create working directory.
ADD . /src
#COPY . /src


# Define working directory.
RUN cd /src; npm install

WORKDIR /src

# Define default command.
#CMD ["bash"]