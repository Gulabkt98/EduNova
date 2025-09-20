const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader'); // assuming this handles videos too
require('dotenv').config();
// create Subsection
exports.createSubSection = async (req, res) => {
    try {
        // fetch data from req body
        const { sectionId, title, timeDuration, description } = req.body;
       
        // extract video from file
        const video = req.files.videoFile;
        
        // validation
        if (!sectionId || !title || !timeDuration || !video) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        // upload video to Cloudinary
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME // e.g., "course-videos"
        );
        
       console.log("sectionId:",sectionId);


        // create Subsection
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl: uploadDetails.secure_url,
        });

        // update the section with new subsection ID
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        ).populate("subSection"); // populate to return full details

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updatedSection,
        });

    } catch (error) {
        console.error("Error creating subsection:", error);
        return res.status(500).json({
            success: false,
            message: `Internal server error while creating subsection : ${error.message}`,
        });
    }
};//done

///update subsection 
exports.updateSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, subSectionId } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Subsection ID is required",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (timeDuration) updateData.timeDuration = timeDuration;
    if (description) updateData.description = description;

    let videoUrl;
    if (req.files?.videoFile) {
      const uploadResponse = await uploadImageToCloudinary(
        req.files.videoFile,
        process.env.FOLDER_NAME,
        { resource_type: "video" }
      );
      videoUrl = uploadResponse.secure_url;
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        ...updateData,
        ...(videoUrl && { videoUrl }),
      },
      { new: true }
    );

    if (!updatedSubSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      updatedSubSection,
    });
  } catch (error) {
    console.error("Error updating subsection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal error while updating subsection",
    });
  }
};//done

/// delete subsection
exports.deleteSubSection = async (req , res)=>{
    try{
        // fetch subsectionId
        const {subSectionId} = req.body;
        // check validation
        if(!subSectionId){
            return res.status(402).json({
                success:false,
                message:"Subsection not found",
            })
        }
        // delete subsection
        const deleteSubSection = await SubSection.findByIdAndDelete(subSectionId);

        /// check delete or not
        if(!deleteSubSection){
            return res.status(403).json({
                success:false,
                message:"sub section is not deleted",

            })
        }

        // sent res
        res.status(200).json({
            success:true,
            message:"subsection is deleted successfully",
            deleteSubSection,
        })


    }
    catch(error){
         console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal  error while deleting subsection subsection",
        })

    }
}