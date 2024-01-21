const Course = require("../../models/courseModel");
const Chapter = require("../../models/courseChapterModel");

class CourseService {
  async createCourse(data) {
    try {
      const course = await Course.create(this.extractCourseFields(data));
      await this.handleChapters(course.id, data.chapters);
      return course;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editCourse(courseId, data) {
    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new Error("Course not found!");
      }

      await course.update(this.extractCourseFields(data));
      await this.handleChapters(courseId, data.chapters);
      return course;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Extracts course fields from data
  extractCourseFields(data) {
    return {
      title: data.title,
      description: data.description,
      learning_outcomes: data.learning_outcomes,
      course_inclusions: data.course_inclusions,
      is_certified: data.is_certified,
      author: data.author,
      rating: data.rating,
      total_enrollments: data.total_enrollments,
      status: data.status,
      chapters: data.chapters,
    };
  }

  // Handle creation and updating of chapters
  async handleChapters(courseId, chapters) {
    if (chapters && chapters.trim() !== "") {
      const chapter_data = JSON.parse(chapters);
      const chapter_data_with_course = chapter_data.map((chapter) => ({
        ...chapter,
        course_id: courseId,
      }));

      await Chapter.destroy({ where: { course_id: courseId } });
      await Chapter.bulkCreate(chapter_data_with_course);
    }
  }

  //Get indiviadual course details
  async getCourseDetails(courseId) {
    try {
      let courseInfo = await Course.findByPk(courseId);
      const chapters = await Chapter.findAll({
        where: {
          course_id: courseId,
        },
      });
      courseInfo = courseInfo.get({ plain: true });

      courseInfo.chapters = chapters;
      return courseInfo;
    } catch (error) {
      throw new Error("Course not found");
    }
  }
}

module.exports = CourseService;
