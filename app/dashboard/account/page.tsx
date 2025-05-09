"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { BadgeCheck, Bell, Camera, Globe, Lock, Moon, Pencil, Shield, Sun, User } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Student at University of Technology, majoring in Computer Science. Passionate about learning and technology.",
    location: "New York, USA",
    website: "johndoe.com",
    avatar: "/placeholder.svg?height=128&width=128",
  })

  const [formData, setFormData] = useState({ ...profileData })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setProfileData({ ...formData })
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleCancelEdit = () => {
    setFormData({ ...profileData })
    setIsEditing(false)
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <DashboardHeader title="Account Settings" description="Manage your account preferences and settings" />

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal information and public profile</CardDescription>
                      </div>
                      {!isEditing && (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-32 w-32 border-2 border-muted">
                          <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                          <AvatarFallback className="text-3xl">JD</AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button variant="outline" size="sm" className="w-full">
                            <Camera className="h-4 w-4 mr-2" />
                            Change Photo
                          </Button>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <BadgeCheck className="h-4 w-4 text-blue-500" />
                          <span>Verified Student</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        {isEditing ? (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="bio">Bio</Label>
                              <textarea
                                id="bio"
                                name="bio"
                                className="w-full min-h-[100px] p-2 border rounded-md resize-none"
                                value={formData.bio}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                  id="location"
                                  name="location"
                                  value={formData.location}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                  id="website"
                                  name="website"
                                  value={formData.website}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                                <p className="text-base">{profileData.name}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Email Address</h3>
                                <p className="text-base">{profileData.email}</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                              <p className="text-base">{profileData.bio}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span>{profileData.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span>{profileData.website}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  {isEditing && (
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </CardFooter>
                  )}
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your app preferences and settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          <Moon className="h-4 w-4" />
                          <h3 className="font-medium">Theme Preference</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Light</span>
                        <Switch />
                        <span className="text-sm">Dark</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <h3 className="font-medium">Language</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                      </div>
                      <select className="p-2 border rounded-md">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          <h3 className="font-medium">Privacy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and authentication methods</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Active Sessions</h3>
                        <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">Chrome on Windows • New York, USA</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">Active Now</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Mobile App</p>
                            <p className="text-sm text-muted-foreground">iOS • Last active 2 hours ago</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Control how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Course Updates</p>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about course updates and new content
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Assignment Reminders</p>
                            <p className="text-sm text-muted-foreground">
                              Get reminders about upcoming assignments and deadlines
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Discussion Replies</p>
                            <p className="text-sm text-muted-foreground">
                              Be notified when someone replies to your discussions
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Newsletter</p>
                            <p className="text-sm text-muted-foreground">
                              Receive our monthly newsletter with learning tips
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">In-App Notifications</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Messages</p>
                            <p className="text-sm text-muted-foreground">Show notifications for new messages</p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Study Group Updates</p>
                            <p className="text-sm text-muted-foreground">
                              Get notified about activity in your study groups
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">System Announcements</p>
                            <p className="text-sm text-muted-foreground">Important announcements about the platform</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Schedule</h3>
                      <p className="text-sm text-muted-foreground">
                        Set quiet hours when you don't want to receive notifications
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="quiet-start">Quiet Hours Start</Label>
                          <Input id="quiet-start" type="time" defaultValue="22:00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quiet-end">Quiet Hours End</Label>
                          <Input id="quiet-end" type="time" defaultValue="07:00" />
                        </div>
                      </div>

                      <Button className="mt-2">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
