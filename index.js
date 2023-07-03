import '../../App.css';
import './CustomNav.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

   //constant 
const CLIENT_ID = "981873ac56b3476d92d47a9390005989";
const CLIENT_SECRET = "b0841714985c4736acf80482980495f0";

const CustomNav = () => {
    const [isOpen,setisOpen] = useState(false);
    const toggle = () => setisOpen(!isOpen);
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);



    const showDetails = (album) => {
        setSelectedAlbum(album);
      };
    
    const closeDetails = () => {
        setSelectedAlbum(null);
      };
    
    useEffect(() => {
        //API Access Token
        var authParameters ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
    
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
        }, [])

           //Search
    async function search(){
        console.log("Search for" + searchInput);

    // Get Request using search to get the Artist ID
            var searchParameters = {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
            }

            var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => {
                if (data.artists && data.artists.items && data.artists.items.length > 0) {
                 return data.artists.items[0].id;
                } else {
                    throw new Error('Artist not found');
                }
             });
        
            console.log("Artist ID is" + artistID);
    // Get Request with Artist ID grap all album from that artist
        var returnedAlbums = await fetch ('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=PH&limit=50', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAlbums(data.items);
            })

            .catch(error => {
                console.log(error); // Log any errors
              });

        }

        console.log(albums);


        return (
            <>
                <style>{`
        body {
          background-color: #3D3D3D;
        }
      `}</style>
      <div style={{ backgroundColor: '#1ed760', padding: '15px' }} className='custom-nav'>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Artist FIND</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <InputGroup className="mb-3" size="lg">
                  <FormControl
                    placeholder="Search Artist"
                    type="input"
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        search();
                      }
                    }}
                    onChange={event => setSearchInput(event.target.value)} />
                  <Button onClick={search}>
                    Search
                  </Button>
                </InputGroup>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/Logout">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <div className="My Spot">
        <Container>
          <Row className='mx = 2 row row-cols-4'>
            {albums && albums.map((album, i) => {
              console.log(album);
              
              return (
                <Card className="spotify-album-card" key={i} style={{ backgroundColor: '#DDDDDD' }} >
                  <Card.Img src={album.images && album.images.length > 0 ? album.images[0].url : ""}
                    alt={album.name}
                    className="spotify-album-image" />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Button onClick={() => showDetails(album)} className="spotify-album-button">See Details</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </Container>
      </div>
      {selectedAlbum && (
        <Modal isOpen={true} toggle={closeDetails} className="spotify-modal-text">
          <ModalHeader toggle={closeDetails} className="spotify-modal-text">{selectedAlbum.name}</ModalHeader>
          <ModalBody>
            <img src={selectedAlbum.images && selectedAlbum.images.length > 0 ? selectedAlbum.images[0].url : ""}
              alt={selectedAlbum.name}
              className="spotify-modal-text"
              style={{ width: '100%', height: 'auto' }}
            />
            <p className="spotify-modal-text">Artist: {selectedAlbum.artists && selectedAlbum.artists.length > 0 ? selectedAlbum.artists[0].name : ""}</p>
            <p className="spotify-modal-text">Release Date: {selectedAlbum.release_date}</p>
            <p className="spotify-modal-text">Total Tracks: {selectedAlbum.total_tracks}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={closeDetails} className="spotify-modal-text">Close</Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}


export default CustomNav;