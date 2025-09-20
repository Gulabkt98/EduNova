const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        // 1. Fetch data
        const { sectionName, courseId } = req.body;

        // 2. Validate data
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties: sectionName and courseId are required",
            });
        }

        // 3. Create new Section
        const newSection = await Section.create({ sectionName });

        // 4. Add section to the course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } }, // assuming 'courseContent' holds sections
            { new: true }
        ).populate("courseContent"); // populate sections if needed

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // 5. Return success response
        return res.status(200).json({
            success: true,
            message: "Section created and added to course successfully",
            updatedCourse,
        });

    } catch (error) {
        console.error("Error creating section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating section",
        });
    }
};


// update section handler
exports.updateSection = async (req, res) =>{
    try {
        // 1. Fetch data
        const { sectionId, sectionName } = req.body;

        // 2. Validate data
        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Missing properties: sectionId and sectionName are required",
            });
        }

        // 3. Update section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // 4. Return success response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedSection,
        });

    } catch (error) {
        console.error("Error updating section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating section",
        });
    }
}

// delete section handler
exports.deleteSection = async (req, res) => {
  try {
    // Fetch sectionId and courseId from request body
    const { sectionId, courseId } = req.body;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing property: sectionId is required",
      });
    }

    // Delete the section document
    const deletedSection = await Section.findByIdAndDelete(sectionId);

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // If courseId is provided, remove the section reference from courseContent
    if (courseId) {
      await Course.findByIdAndUpdate(courseId, {
        $pull: { courseContent: sectionId },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      deletedSection,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting section",
    });
  }
};
