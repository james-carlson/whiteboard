module.exports = {
    
    // NAVIGATION
    // ##A  GETS 
    // ##B  POSTS 
    // ##C  PUTS 
    // ##D  DELETES


    //##A       GETS

    getUser: ( req, res, next ) => {
        const db = req.app.get('db')
        db.getUserInfo( req.params.id ).then(( response )=>{
            res.status( 200 ).send( response )
        })
    },

    getGroup: ( req, res, next ) => {
        const db = req.app.get('db')
        db.getGroupInfo(req.params.id).then((response) => {
            res.status(200).send(response)
        })
    },

    getProject: ( req, res, next ) => {
        const db = req.app.get('db')
        db.getProjectInfo(req.params.id).then((response) => {
            res.status(200).send(response)
        })
    },
    
    getGroupMembers: ( req, res, next ) => {
        const db = req.app.get('db')
        db.getGroupMembers(req.params.id).then((response) => {
            res.status(200).send(response)
        })
    },

    getProjectMembers: ( req, res, next ) => {
        const db = req.app.get('db')
        db.getProjectMembers(req.params.id).then((response) => {
            res.status(200).send(response)
        })
    },

    //##B        POSTS

    addUser: ( req, res, next ) => {
        const userData = [
            auth0,
            name,
            email,
            profilepic,
        ]
        const db = req.app.get('db')
        db.addNewUser(userData).then((response) => {
            res.status(200).send(response)
        })
    },

    addGroup: ( req, res, next ) => {
        const groupData = [
            req.body.name
        ]
        const db = req.app.get('db')
        db.addNewGroup(groupData).then((response) => {
            res.status(200).send(response)
        })
    },

    addProject: ( req, res, next ) => {
        const projectData = [
            req.params.id,
            req.body.name
        ]
        const db = req.app.get('db')
        db.addNewProject(projectData).then((response) => {
            res.status(200).send(response)
        })
    },
    // PLACEHOLDER
    // updateUser: ( req, res, next ) => {
    //     const userData = [
    //         auth0,
    //         name,
    //         email,
    //         profilepic,
    //     ]
    //     const db = req.app.get('db')
    //     db.addNewUser(userData).then((response) => {
    //         res.status(200).send(response)
    //     })
    // },
    
    //##C      PUTS
    
    updateGroup: ( req, res, next ) => {
        const db = req.app.get('db')
        const groupUpdateData = [
            req.body.name,
            req.params.id
        ]
        db.updateGroupData(groupUpdateData).then((response) => {
            res.status(200).send(response)
        })
    },

    updateProject: ( req, res, next ) => {
        const db = req.app.get('db')
        const projectUpdateData = [
            req.body.name,
            req.params.id
        ]
        db.updateProjectData(projectUpdateData).then((response) => {
            res.status(200).send(response)
        })
    },

        //##D       DELETES
     
     deleteProject: ( req, res, next ) => {
         const db = req.app.get('db')

         db.deleteProject(req.params.id).then((response) => {
             res.status(200).send(response)
         })
     }
}