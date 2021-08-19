import { NextApiRequest, NextApiResponse } from 'next'

// In the name of the file, if I use something like:
// [...params].tsx, I can get all params using request.query

export default (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query)

    const users = [
        { id: 1, name: 'Tiago' },
        { id: 2, name: 'Diego' },
        { id: 3, name: 'Lucas' },
    ]   

    return response.json(users)
}