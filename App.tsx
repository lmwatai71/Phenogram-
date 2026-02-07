import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Feed from './components/Feed';
import Reels from './components/Reels';
import CreatePost from './components/CreatePost';
import StrainBot from './components/StrainBot';
import Profile from './components/Profile';
import Auth from './components/Auth';
import DirectMessages from './components/DirectMessages';
import StoryViewer from './components/StoryViewer';
import Metaverse from './components/Metaverse';
import Subscription from './components/Subscription';
import Earnings from './components/Earnings';
import { ViewState, User, Story } from './types';
import { MOCK_STORIES } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.FEED);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [previousView, setPreviousView] = useState<ViewState>(ViewState.FEED);
  
  // Story View State
  const [viewingStory, setViewingStory] = useState<Story | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setSelectedUser(user); // Initialize selected user to self
  };

  const handleUserClick = (user: User) => {
    setPreviousView(currentView);
    setSelectedUser(user);
    setCurrentView(ViewState.PROFILE);
  };

  const handleMessageClick = (targetUser: User) => {
    setSelectedUser(targetUser);
    setCurrentView(ViewState.MESSAGES);
  };

  const handleNavigation = (view: ViewState) => {
    if (view === ViewState.PROFILE && currentUser) {
      setSelectedUser(currentUser);
    }
    if (view === ViewState.FEED && currentUser) {
        setSelectedUser(currentUser);
    }
    setCurrentView(view);
  };

  const handleUpgrade = () => {
    if (currentUser) {
        // Optimistic update
        const updatedUser = { ...currentUser, isPremium: true, isVerified: true };
        setCurrentUser(updatedUser);
        if (selectedUser?.id === currentUser.id) {
            setSelectedUser(updatedUser);
        }
    }
  };

  // Story Navigation
  const handleNextStory = () => {
      if (!viewingStory) return;
      const currentIndex = MOCK_STORIES.findIndex(s => s.id === viewingStory.id);
      if (currentIndex < MOCK_STORIES.length - 1) {
          setViewingStory(MOCK_STORIES[currentIndex + 1]);
      } else {
          setViewingStory(null);
      }
  };

  const handlePrevStory = () => {
      if (!viewingStory) return;
      const currentIndex = MOCK_STORIES.findIndex(s => s.id === viewingStory.id);
      if (currentIndex > 0) {
          setViewingStory(MOCK_STORIES[currentIndex - 1]);
      } else {
          setViewingStory(null);
      }
  };

  // If not logged in, show Auth screen
  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  const profileUser = selectedUser || currentUser;

  const renderView = () => {
    switch (currentView) {
      case ViewState.FEED:
        return (
            <Feed 
                setView={setCurrentView} 
                onUserClick={handleUserClick} 
                currentUser={currentUser} 
                onViewStory={setViewingStory}
            />
        );
      case ViewState.REELS:
        return <Reels setView={setCurrentView} onUserClick={handleUserClick} />;
      case ViewState.METAVERSE:
        return <Metaverse currentUser={currentUser} onUpgrade={() => setCurrentView(ViewState.SUBSCRIPTION)} />;
      case ViewState.CREATE:
        return <CreatePost currentUser={currentUser} />;
      case ViewState.CHAT:
        return <StrainBot />;
      case ViewState.PROFILE:
        return (
          <Profile 
            user={profileUser} 
            isCurrentUser={profileUser.id === currentUser.id}
            onBack={profileUser.id !== currentUser.id ? () => setCurrentView(previousView) : undefined}
            onMessage={() => handleMessageClick(profileUser)}
            onUpgrade={() => setCurrentView(ViewState.SUBSCRIPTION)}
            onOpenEarnings={() => setCurrentView(ViewState.EARNINGS)}
          />
        );
      case ViewState.MESSAGES:
        return (
            <DirectMessages 
                currentUser={currentUser}
                initialTargetUser={profileUser.id === currentUser.id ? null : profileUser}
                onBack={() => setCurrentView(previousView || ViewState.FEED)}
            />
        );
      case ViewState.SUBSCRIPTION:
        return (
            <Subscription 
                onClose={() => setCurrentView(previousView || ViewState.FEED)}
                onSubscribe={handleUpgrade}
                currentUser={currentUser}
            />
        );
      case ViewState.EARNINGS:
        return (
            <Earnings 
                currentUser={currentUser}
                onBack={() => setCurrentView(ViewState.PROFILE)}
            />
        );
      default:
        return (
            <Feed 
                setView={setCurrentView} 
                onUserClick={handleUserClick} 
                currentUser={currentUser} 
                onViewStory={setViewingStory}
            />
        );
    }
  };

  const showNav = currentView !== ViewState.MESSAGES && currentView !== ViewState.CREATE && currentView !== ViewState.SUBSCRIPTION && currentView !== ViewState.EARNINGS;

  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-emerald-500/30">
      {renderView()}
      {showNav && <Navigation currentView={currentView} setView={handleNavigation} />}
      
      {/* Story Viewer Overlay */}
      {viewingStory && (
          <StoryViewer 
            story={viewingStory} 
            onClose={() => setViewingStory(null)} 
            onNext={handleNextStory}
            onPrev={handlePrevStory}
          />
      )}
    </div>
  );
};

export default App;