export class Lieu {
    public nom: string;
    public adresse: string;
    public rating: number;
    public lat: number;
    public long: number;

    constructor(nom: string, adresse: string, rating: number) {
            this.nom = nom;
            this.adresse = adresse;
            this.rating = rating;
    }

    setLatLong(lat: number, long: number) {
        this.lat = lat;
        this.long = long;
    }
}
