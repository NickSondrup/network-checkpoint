export class Profile {
  constructor(profileData = {}) {
    this.picture = profileData.picture
    this.bio = profileData.bio
    this.coverImg = profileData.coverImg
    this.github = profileData.github
    this.linkedin = profileData.linkedin
    this.resume = profileData.resume
    this.class = profileData.class
    this.graduated = profileData.graduated
    this.name = profileData.name
    this.email = profileData.email
    this.createdAt = profileData.createdAt
    this.id = profileData.id
  }
}
