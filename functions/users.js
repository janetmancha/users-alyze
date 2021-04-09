const admin = require('firebase-admin');

exports.users = {
    create: async function(req, res) {
        const id = req.body.id;
        const ref = admin.firestore().collection('users').doc(id);
        const doc = await ref.get();
        if (doc.exists) {
            res.status(409).json({result: `user with ID: ${id} already exists.`});
        } else {
            let clonedBody = { ...req.body };
            delete clonedBody.id;
            await ref.set(clonedBody);
            res.status(201).json({result: `user with ID: ${id} added.`});
        }
    },
    get: async function(req, res) {
        const ref = admin.firestore().collection('users').doc(req.params.id);
        const doc = await ref.get();
        if (doc.exists) {
            data = doc.data();
            res.status(200).json({ id: req.params.id, name: data.name});
        } else {
            res.status(404).json({result: `user with ID: ${req.params.id} does not exists.`});
        }
    },
    update: async function(req, res) {
        const id = req.params.id;
        const ref = admin.firestore().collection('users').doc(id);
        const doc = await ref.get();
        if (doc.exists) {
            let clonedBody = { ...req.body };
            delete clonedBody.id;
            await ref.set(clonedBody);
            res.status(200).json({result: `user with ID: ${id} updated.`});
        } else {
            res.status(404).json({result: `user with ID: ${id} does not exists.`});
        }
    },
    delete: async function(req, res) {
        const id = req.params.id;
        const ref = admin.firestore().collection('users').doc(id);
        const doc = await ref.get();
        if (doc.exists) {
            await ref.delete();
            res.status(200).json({result: `user with ID: ${id} deleted.`});
        } else {
            res.status(404).json({result: `user with ID: ${id} does not exists.`});
        }
    },
    list: async function(req, res) {
        const all = await admin.firestore().collection('users').get();
        const allWithIds = all.docs.map(doc => {
            d = doc.data();
            d.id = doc.id;
            return d;
        });
        res.status(200).json(allWithIds);
    },
}
