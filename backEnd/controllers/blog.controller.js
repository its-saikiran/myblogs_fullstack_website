const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const addBlog = async(req, res) => {
    const image = req.file;
    
    try {
        await prisma.blog.create({
            data: req.body
        })
        res.status(201).json({ 
            msg: 'Blog created successfully.', 
            navigate: '/blogs'
        })
    } catch (error) {
        res.status(500).json({
            msg: error,
            navigate: '/Error'
        })
    }
}


const getBlogs = async(req, res) => {
    // const { offset=0, limit=5, orderBy='asc' } = req.params;
    // let conditions = {
    //     skip: parseInt(offset),
    //     take: parseInt(limit)
    // };
    try {
        const data = await prisma.blog.findMany({
            include: {
                user: true
            }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};



const updateBlog = async(req, res) => {
    const query = req.body.query;
    delete req.body.query;
    const id = parseInt(req.params.id);
    try {
        const { comments } = await prisma.blog.findUnique({
            where: { id },
            select: {
                comments: true
            }
        })
        const data = [...comments, JSON.stringify(req.body)]
        const result = await prisma.blog.update({
            where: { id },
            data: {
                [query]: data
            },
            include: {
                user: true
            }

        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            msg: error,
            navigate: '/Error'
        })
    }
}



const getBlogById = async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const data = await prisma.blog.findUnique({
            where: { id }
        })
        res.status(200).send(data? data: "There is no blog with this id")
    } catch (error) {
        res.status(500).send(error.message)
    }
};



const getBlogsByBloggerId = async(req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const data = await prisma.blog.findMany({
            where: { userId }
        })
        res.status(200).send(data.length === 0? "There are no blog with this blogger id." : data)
    } catch (error) {
        res.status(500).send(error.message)
    }
};



module.exports = {
    addBlog,
    getBlogs,
    updateBlog,
    getBlogById,
    getBlogsByBloggerId
}