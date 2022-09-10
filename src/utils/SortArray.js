export const timeLineArray = (blogdata) => {
    // 建立一个时间数组
    let timeline = []
    blogdata.forEach((data, index) => {
        timeline.push(data.create_time)
    })
    timeline = Array.from(new Set(timeline))
    timeline.sort()
    timeline.reverse()
    timeline = timeline.map((data) => {
        return {
            time: data,
            data: []
        }
    })
    blogdata.forEach((data) => {
        for (let i = 0; i < timeline.length; i++) {
            if (data.create_time == timeline[i].time) {
                timeline[i].data.push(data)
            }
        }
    })
    return timeline
}
export const tagsArray = (blogdata) => {
    // 计算tag的数量
    let tagsdata = []
    blogdata.forEach((data, index) => {
        tagsdata = tagsdata.concat(data.tags)
    })
    tagsdata = Array.from(new Set(tagsdata))
    tagsdata.reverse()
    tagsdata = tagsdata.map((data) => {
        return {
            tag: data,
            data: []
        }
    })
    blogdata.forEach((data) => {
        let bdata = data
        data.tags.forEach((data) => {
            for (let i = 0; i < tagsdata.length; i++) {
                if (data == tagsdata[i].tag) {
                    tagsdata[i].data.push(bdata)
                }
            }
        })

    })
    return tagsdata
}
export const classesArray = (blogdata) => {
    // 计算class的数量
    let classesdata = []
    blogdata.forEach((data, index) => {
       classesdata =classesdata.concat(data.classes)
    })
   classesdata = Array.from(new Set(classesdata))
   classesdata.reverse()
    classesdata = classesdata.map((data) => {
        return {
            class: data,
            data: []
        }
    })
    blogdata.forEach((data) => {
        let bdata = data
        data.classes.forEach((data) => {
            for (let i = 0; i < classesdata.length; i++) {
                if (data == classesdata[i].class) {
                    classesdata[i].data.push(bdata)
                }
            }
        })

    })
   return classesdata
}
export const ThreeSortArray = (blogdata)=>{
    let data = []
    data.push(classesArray(blogdata))
    data.push(tagsArray(blogdata))
    data.push(timeLineArray(blogdata))
    return data
}