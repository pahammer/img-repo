from . import firestore_client


def update_index(collection, img_location, img_name, source, tags):

    return firestore_client.collection(collection).add({
        u'img_location': img_location,
        u'img_name': img_name,
        u'source': source,
        u'tags': tags,
    })
