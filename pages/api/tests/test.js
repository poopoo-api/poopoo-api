const mySecret = process.env.test;
export default async (req, res) => {
    res.send(String(mySecret))
}