# Phase 3: Annotations (2.5 days)

## Rails
### Models
* Annotation
* Tag
* Tagging

### Controllers
* Api::AnnotationsController (create, destroy, index, show, update)

### Views
* annotations/index.json.jbuilder
* annotations/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* AnnotationsIndex
  - AnnotationIndexItem
* AnnotationForm
* SearchIndex

### Stores
* Annotation

### Actions
* ApiActions.receiveAllAnnotations -> triggered by ApiUtil
* ApiActions.receiveSingleAnnotation
* ApiActions.deleteAnnotation
* AnnotationActions.fetchAllAnnotations -> triggers ApiUtil
* AnnotationActions.fetchSingleAnnotation
* AnnotationActions.createAnnotation
* AnnotationActions.editAnnotation
* AnnotationActions.destroyAnnotation

### ApiUtil
* ApiUtil.fetchAllAnnotations
* ApiUtil.fetchSingleAnnotation
* ApiUtil.createAnnotation
* ApiUtil.editAnnotation
* ApiUtil.destroyAnnotation

## Gems/Libraries
* Jquery for text selection?
